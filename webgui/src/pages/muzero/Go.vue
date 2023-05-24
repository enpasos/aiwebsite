<template>
    <div class="q-pa-xl">
      <div class="q-gutter-y-lg">
        <div class="row justify-start">
          <q-radio v-model="sizeString" color="grey-9" label="5x5" val="5"  />
          <q-radio v-model="sizeString" color="grey-9" label="9x9" val="9" />
          <q-toggle
            v-model="humanPlaysBlack"
            :label="aiPlaysBlackLabel"
            color="grey-9"
            @click="restart"
          />
          &nbsp;
          &nbsp;
          <q-select v-model="komi" :options="komis" color="grey-5" dense label="komi" label-color="grey-9"  options-dense outlined style="min-width: 80px" @update:model-value="onKomiChange" />
        </div>
        <div class="row justify-start">
          <div>
            <div :class="eventscss">
              <div id="tenukiBoard"  class="tenuki-board tenuki-board-flat" data-include-coordinates="true" style="width:800px;height:800px;"></div>
            </div>

          </div>
          <div class="row items-stretch">
            <q-slider
              v-model="numSimulations"
              :max="100"
              :min="0"
              class="fit"
              color="grey"
              label-always
              reverse
              vertical
            />
          </div>
          <div class="column q-ml-xl" >
            <q-btn  v-if="playingAllowed"  color="grey-4" label="pass" style="min-width: 80px" text-color="grey-9" @click="pass" />
            <q-btn  v-if="playingAllowed"  class="q-mt-sm"  color="grey-4" label="undo" style="min-width: 80px" text-color="grey-9" @click="undo" />
            <q-btn  v-if="gameOver"  color="white" label="Restart" style="min-width: 80px"  text-color="grey-9" @click="restart"></q-btn>
          </div>
          </div>
      </div>
      <div>{{ lastMoveStr }}</div>
      <!--div>{{ actions }}</div-->
      <div  v-if="inferenceTime" class="text-grey-13">{{ inferenceTime }} ms for inference</div>
      <div v-if="gameOver">{{ resultStr }}</div>
      <div>&nbsp;</div>
      <GChart
        :data="chartData"
        :options="chartOptions"
        type="LineChart"
      />
     </div>
</template>
<style>
.noClick {
  pointer-events: none;
}
</style>
<script lang="ts">
import tenuki from 'tenuki'
import {mathUtils, muzero, runModelUtils} from '../../utils'
import {InferenceSession, Tensor} from 'onnxruntime-web'
import {GChart} from 'vue-google-charts'
import {defineComponent} from 'vue'
import {Player} from "src/utils/muzero/Player";

export default defineComponent({
  name: 'Go',
  components: {
    GChart
  },
  // props: {
  //   initialsize: {
  //     type: Number,
  //     default: 5
  //   }
  // },
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        [ 'moves done', 'raw score', 'score with komi' ]
      ] as (string[] | number[])[],
      komi: 6.5,
      komis: [ 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5, 17.5,18.5,19.5,20.5,21.5,22.5,23.5,24.5 ],
      chartOptions: {
        legend: { position: 'top' },
        pointsVisible: true,
        colors: [ '#cccccc', '#2090ff' ],
        hAxis: {
          title: 'moves done',
          format: 'short',
          minValue: 0,
          viewWindow: {
            min: 0
          }
        },
        vAxis: {
          title: 'expected'
        }
      },
      sizeString: '5' as string,
      humanPlaysBlack: true as boolean,
      numSimulations: 30 as number,
      initialModelFile: {} as ArrayBuffer,
      recurrentModelFile: {} as ArrayBuffer,
      sessionBackend: 'wasm' as string,
      initialSession: undefined as InferenceSession | undefined,
      recurrentSession: undefined as InferenceSession | undefined,
      // gpuInitialSession: InferenceSession | undefined,
      cpuInitialSession: undefined as InferenceSession| undefined, // | undefined,
      // gpuRecurrentSession: InferenceSession | undefined,
      cpuRecurrentSession: undefined as InferenceSession| undefined,
      initialSessionRunning: false  as boolean,
      initialModelLoading: false  as boolean,
      initialModelInitializing: false  as boolean,
      initialModelLoadingError: false  as boolean,
      initialCpuSession: false  as boolean,
      recurrentModelLoading: false  as boolean,
      recurrentModelInitializing: false  as boolean,
      recurrentSessionRunning: false as boolean,
      inferenceTime: 0 as number,
      recurrentModelLoadingError: false  as boolean,
      panel: 'play' as string,
      s: undefined,
      current: 0 as number,
      lastMoveStr: undefined as string | undefined,
      mcts: false,
      played: [] as any [],
      game: {
        callbacks: {} as any,
        isOver(): boolean { return true},
        score(): any { return {}},
        currentState(): any { return {}},
        boardSize: 0 as number,
        undo(): void {},
        pass(): void {},
        resign(): void {},
        playAt(row : number, col : number) : void {},
        labelsAt(labels : any[ ], color: string) : void {},
        _moves: [] as any[],
        isIllegalAt(row : number, col : number) : boolean {return true},
        komi: 0 as number,
        current: 0 as number,
        lastMoveStr: "" as string,
        _scorer: {} as any

      },
      resultStr: '',
      restarting: false
    }
  },
  watch: {
    sizeString: {
      handler: function () {
        this.setup()
        this.afterTenukiCreated()
      }
    }
  },
  computed: {
    actions(): number[] {
      // extract cols + rows*5 from this.played as a flat array
      return this.played.map( obj  => {
        return obj.type == 'play' ?  obj.col + obj.row * 5 : 25
      } )
    },
    size(): number {
      return parseInt(this.sizeString)
    },
    initialModelFilepath(): string {
      return '/onnx/MuZero-Go-' + this.sizeString + '-InitialInference.onnx'
    },
    recurrentModelFilepath(): string {
      return '/onnx/MuZero-Go-' + this.sizeString + '-RecurrentInference.onnx'
    },
    gameOver(): boolean {
      return this.game.isOver()
    },
    gameResult(): string {
      if (!this.game) return ''
      if (!this.game.isOver()) return ''
      return this.game.score()
    },
    eventscss(): string {
      if (this.played.length === this.current) return ''
      return 'noClick'
    },
    playingAllowed(): boolean {
      return this.played.length === this.current && (this.game && !this.game.isOver())
    },
    layout() {
      return 'loose'
    },
    displayPagination(): boolean {
      return this.played.length > 0
    },
    toggleLabel(): string {
      return this.mcts ? 'thinking fast or <b>slow</b>' : 'thinking <b>fast</b> or slow'
    },
    aiPlaysBlackLabel(): string {
      return this.humanPlaysBlack ? 'you play black' : 'you play white'
    },
    buttonLabel(): string {
      return this.gameOver ? 'New game' : 'Next move from AI'
    },
    whiteToPlay(): boolean {
      return this.calcWhiteToPlay()
    }
  },
  created () {
    this.afterTenukiCreated()
  },
  methods: {
    async afterTenukiCreated () {
      // fetch the model file to be used later
      const responseA = await fetch(this.initialModelFilepath)
      const responseB = await fetch(this.recurrentModelFilepath)
      this.initialModelFile = await responseA.arrayBuffer()
      this.recurrentModelFile = await responseB.arrayBuffer()
      try {
        await this.initInitialSession()
        await this.initRecurrentSession()
      }
      catch (e) {
        this.sessionBackend = 'wasm'
      }
      const state = this.game.currentState()
      await this.callPredictionFromAI()
      if (!this.restarting && state.color === (this.humanPlaysBlack ? 'black' : 'white') && this.panel === 'play') {
        await this.callNextMoveFromAI()
      }
    },
    calcWhiteToPlay () {
      const state = this.game.currentState()
      return state.color === 'black'
    },
    calcLastMoveStr () {
      if (!this.game) return ''
      const state = this.game.currentState()
      const moveNo = state.moveNumber
      if (moveNo === 0) return
      const move = this.played[ moveNo - 1 ]
      let str = (moveNo - 1) % 2 === 0 ? 'black' : 'white'
      if (move.type === 'play') {
        str += ' played ' + this.colToLetter(move.col) + (this.game.boardSize - move.row)
      }
      else if (move.type === 'pass') {
        str += ' passed'
      }
      return str
    },
    tabPanel (newValue : string, oldValue: string) {
      if (newValue === 'selfplay') {
        this.pagination(this.played.length)
      }
    },
    undo () {
      if (this.played.length > 1) {
        this.restarting = true
        this.pagination(this.played.length - 1)
        this.pophere()
        this.chartData.pop()
        this.pagination(this.played.length - 1)
        this.pophere()
        this.chartData.pop()
        this.restarting = false
      }
    },
    pagination (modelValue: number) {
      let state = this.game.currentState()
      if (modelValue === 1) {
        while (state.moveNumber > 1) {
          this.game.undo()
          state = this.game.currentState()
        }
      }
      else if (modelValue === state.moveNumber - 1) {
        this.game.undo()
      }
      else if (modelValue === this.played.length) {
        while (state.moveNumber < this.played.length) {
          const move = this.played[ state.moveNumber ]
          this.playMove(move)
          state = this.game.currentState()
        }
      }
      else if (modelValue === state.moveNumber + 1) {
        const move = this.played[ modelValue - 1 ]
        this.playMove(move)
      }
    },
    colToLetter (col: number) {
      return String.fromCharCode(65 + col)
    },
    playMove (move: any) {
      if (move.type === 'play') {
        return this.game.playAt(move.row, move.col)
      }
      else if (move.type === 'pass') {
        this.game.pass()
      }
    },
    getResultFromAI () {
      if (this.game.isOver()) {
        const s = this.game.score()
        const r = s.black - s.white - this.komi
        if (r > 0) {
          this.resultStr = 'black wins by ' + r
        }
        else {
          this.resultStr = 'white wins by ' + (-r)
        }
      }
    },
    pophere () {
      while (this.played.length > this.current) {
        this.played.pop()
      }
    },
    label () {
      // debugger
      // this.game.currentState().labelAt(3, 4, '7')
      // this.game.render()
      this.game.labelsAt([{ x: 1, y: 2, label: '1' }], 'red')
    },
    resign () {
      this.game.resign()
    },
    pass () {
      this.game.pass()
    },
    async restart () {
      this.restarting = true
      // debugger
      let state = this.game.currentState()
      while (state.moveNumber > 0) {
        this.game.undo()
        state = this.game.currentState()
      }
      this.played = []
      this.lastMoveStr = ''
      this.clearChartData()
      this.restarting = false
      if (state.color === (this.humanPlaysBlack ? 'black' : 'white') && this.panel === 'play') {
        await this.callNextMoveFromAI()
      } else {
        await this.callPredictionFromAI()
      }


    },
    callAI () {
      this.callNextMoveFromAI()
    },
    softmax (tensor: Tensor) {
      return mathUtils.softmax(Array.prototype.slice.call(tensor.data))
    },
    historicActions () {
      const historicActions = []
      for (let i = 0; i < this.game._moves.length; i++) {
        const move = this.game._moves[ i ]
        if (move.pass) {
          historicActions.push(this.size * this.size)
        }
        else {
          historicActions.push(move.playedPoint.y * this.size + move.playedPoint.x)
        }
      }
      return historicActions
    },
    legalActions () : number[] {
      const legalActions = []
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          if (!this.game.isIllegalAt(y, x)) {
            legalActions.push(y * this.size + x)
          }
        }
      }
      legalActions.push(this.size * this.size)
      return legalActions
    },
    async aiPrediction (tensor : Tensor) : Promise<number> {
      // debugger
      const legalActions = this.legalActions()
      const historicActions = this.historicActions()
      const toPlay : Player = this.calcWhiteToPlay() ? Player.white : Player.black
      const scale = this.size * this.size
      if (this.initialSession && this.recurrentSession) {
        const [ , , value ] = await muzero.runDecision(scale, this.size, this.initialSession, this.recurrentSession, [tensor], historicActions, legalActions, toPlay, false, 0, this.humanPlaysBlack)
        // console.log(value)
       // debugger
        return value
      } else {
        return -1000000;
      }
    },
    async aiDecision (tensor : Tensor) : Promise<any[]> {
      this.initialSessionRunning = true
      const legalActions = this.legalActions()
      const historicActions = this.historicActions()
      const toPlay : Player = this.calcWhiteToPlay() ? Player.white : Player.black
      const scale = this.size * this.size
      if (this.initialSession && this.recurrentSession) {
        const [action, time, value] = await muzero.runDecision(scale, this.size, this.initialSession, this.recurrentSession, [tensor], historicActions, legalActions, toPlay, true, this.numSimulations, this.humanPlaysBlack)
        // console.log(value)
       // debugger
        return [action, time, value]
      } else {
        return []
      }
    },
    async sleep (ms : number) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async callNextMoveFromAI () {
      // console.log('callNextMoveFromAI')
      await this.sleep(100)
      const tensor = this.preprocess(this.game._moves)
      const [ action, time, value ] = await this.aiDecision(tensor)
      this.inferenceTime = time
      const col = action % this.size
      const row = (action - col) / this.size
      const move = {
        type: action === this.size * this.size ? 'pass' : 'play',
        row: row,
        col: col
      }
      if (move.type === 'pass') {
        this.playMove(move)
      }
      else {
        this.game.playAt(move.row, move.col)
      }
      const t = this.chartData.length - 2
      this.chartData.push([ t + 1, value, this.humanPlaysBlack ? value - this.komi : value + this.komi ])
    },
    async callPredictionFromAI () {
      // console.log('callPredictionFromAI')
      await this.sleep(100)
      const tensor = this.preprocess(this.game._moves)
      const value = await this.aiPrediction(tensor)
      const t = this.chartData.length - 2
      this.chartData.push([ t + 1, value, this.humanPlaysBlack ? value - this.komi : value + this.komi ])
    },
    preprocess (moves : any[]) {
      //debugger
      const boardsize = this.size * this.size
      const input = new Float32Array(17 * boardsize)
      let nextPlayer = 'black'
      //let lastPlayer = ''
      if (moves.length > 0) {
        if (moves[ moves.length - 1 ].color === 'black') {
          nextPlayer = 'white'
          //lastPlayer = 'black'
        }
        else {
          nextPlayer = 'black'
          //lastPlayer = 'white'
        }
      }
      for (let m = 0; m < 8; m++) {
        if (moves.length - 8 + m < 0) continue
        const move = moves[ moves.length - 8 + m ]
        for (let i = 0; i < move.intersections.length; i++) {
          const inters = move.intersections[ i ]
          if (inters.value === 'empty') continue
          if (inters.value === nextPlayer) {
            input[ m * 2 * boardsize + 0 + this.size * inters.y + inters.x ] = 1.0
          }
          else {
            input[ m * 2 * boardsize + boardsize + this.size * inters.y + inters.x ] = 1.0
          }
        }
      }
      for (let i = 0; i < boardsize; i++) {
        input[ 8 * 2 * boardsize + i ] = ((nextPlayer === 'black') ? 0.0 : 1.0)  // need to be changed to 'black'
      }
      const tensor = new Tensor('float32', input, [ 1, 17, this.size, this.size ])
      // console.log(tensor.data.toString())
   //   debugger
      return tensor
    },
    async initInitialSession () {
      this.initialSessionRunning = false
      this.initialModelLoadingError = false
      if (this.initialCpuSession) {
        this.initialSession = this.cpuInitialSession
        return
      }
      this.initialModelLoading = true
      this.initialModelInitializing = true

      try {
        this.cpuInitialSession = await runModelUtils.createModelCpu(this.initialModelFile)
        this.initialSession = this.cpuInitialSession
      }
      catch (e) {
        this.initialModelLoading = false
        this.initialModelInitializing = false
        this.cpuInitialSession = undefined
        throw new Error('Error: Backend not supported. ')
      }
      this.initialModelLoading = false
      // warm up session with a sample tensor. Use setTimeout(..., 0) to make it an async execution so
      // that UI update can be done.
      await runModelUtils.warmupModel(this.initialSession, [[ 1, 17, this.size, this.size ]])
      this.initialModelInitializing = false
    },
    async initRecurrentSession () {
      this.recurrentSessionRunning = false
      this.recurrentModelLoadingError = false
      if (this.cpuRecurrentSession) {
        this.recurrentSession = this.cpuRecurrentSession
        return
      }
      this.recurrentModelLoading = true
      this.recurrentModelInitializing = true

      try {
        this.cpuRecurrentSession = await runModelUtils.createModelCpu(this.recurrentModelFile)
        this.recurrentSession = this.cpuRecurrentSession
      }
      catch (e) {
        this.recurrentModelLoading = false
        this.recurrentModelInitializing = false
        this.cpuRecurrentSession = undefined
        throw new Error('Error: Backend not supported. ')
      }
      this.recurrentModelLoading = false
      // warm up session with a sample tensor. Use setTimeout(..., 0) to make it an async execution so
      // that UI update can be done.
     // if (  this.recurrentSession instanceof  InferenceSession) {
      //  warmupModel(model: InferenceSession, dimsArray: [number[]])
        await runModelUtils.warmupModel(this.recurrentSession, [ [ 1, 19, this.size, this.size ], [ 1, 1, this.size, this.size ] ])
     // }
      this.recurrentModelInitializing = false
    },
    onKomiChange () {
      //this.game._scorer.komi = this.komi
      for (let i = 1; i < this.chartData.length; i++) {
        const value_ = this.chartData[ i ][ 1 ]
        if (typeof value_ === "number") {
          this.chartData[ i ][ 2 ] = this.humanPlaysBlack ? value_ - this.komi : value_ + this.komi
        }
      }
    },
    clearChartData () {
      // remove all but the first entry from this.chartData
      this.chartData = this.chartData.slice(0, 1)
    },
    setup () {
      const ten = document.getElementById('tenukiBoard')
      if (ten != null && ten.children.length > 0) {
        ten.removeChild(ten.children[ 0 ])
      }
      // this.chartData = [
      //   [ 'time', 'raw score', 'score with komi' ],
      //   [0,0,0]
      // ]
      this.game = new tenuki.Game({ element: ten, boardSize: this.size, komi: 0, scoring: 'area' })
      if (this.game) {
        const me = this;
        this.game.callbacks.postRender = async function () {
          // debugger
          const state = me.game.currentState()
          if (state.moveNumber ===  me.played.length + 1) {
            const move = {
              type: "" as string,
              col: -1 as number,
              row: -1 as number
            }
            if (state.pass) {
              move.type = 'pass'
            }
            if (state.playedPoint) {
              move.type = 'play'
              move.col = state.playedPoint.x
              move.row = state.playedPoint.y
            }
            me.played.push(move)
          }
          me.current = state.moveNumber
          me.lastMoveStr =  me.calcLastMoveStr()
          me.getResultFromAI()

          if (!me.restarting) {
            if (state.color === (me.humanPlaysBlack ? 'black' : 'white') && me.panel === 'play') {
              await me.callNextMoveFromAI()
            } else {
              await me.callPredictionFromAI()
            }
          }

        }.bind(this)
      }
    }
  },
  mounted () {
    this.setup()
    return {}
  }
})
</script>
