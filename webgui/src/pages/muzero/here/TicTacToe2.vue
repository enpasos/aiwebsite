<template>
  <div>
    <div class="fit tic-tac-toe-container">
      <div class="tic-tac-toe">
        <input class="player-1 left first-column top first-row first-diagonal turn-1" id="block1-1-1" type="radio" v-model="play[0].a3" v-bind:value="1" />
        <label class="turn-1" for="block1-1-1"></label>
        <input class="player-1 middle second-column top first-row turn-1" id="block1-1-2" type="radio" v-model="play[0].b3" v-bind:value="1"/>
        <label class="turn-1" for="block1-1-2"></label>
        <input class="player-1 right third-column top first-row second-diagonal turn-1" id="block1-1-3" type="radio" v-model="play[0].c3" v-bind:value="1"/>
        <label class="turn-1" for="block1-1-3"></label>
        <input class="player-1 left first-column center second-row turn-1" id="block1-2-1" type="radio" v-model="play[0].a2" v-bind:value="1"/>
        <label class="turn-1" for="block1-2-1"></label>
        <input class="player-1 middle second-column center second-row first-diagonal second-diagonal turn-1" id="block1-2-2" type="radio" v-model="play[0].b2" v-bind:value="1"/>
        <label class="turn-1" for="block1-2-2"></label>
        <input class="player-1 right third-column center second-row turn-1" id="block1-2-3" type="radio" v-model="play[0].c2" v-bind:value="1"/>
        <label class="turn-1" for="block1-2-3"></label>
        <input class="player-1 left first-column bottom third-row second-diagonal turn-1" id="block1-3-1" type="radio" v-model="play[0].a1" v-bind:value="1"/>
        <label class="turn-1" for="block1-3-1"></label>
        <input class="player-1 middle second-column bottom third-row turn-1" id="block1-3-2" type="radio" v-model="play[0].b1" v-bind:value="1"/>
        <label class="turn-1" for="block1-3-2"></label>
        <input class="player-1 right third-column bottom third-row first-diagonal turn-1" id="block1-3-3" type="radio" v-model="play[0].c1" v-bind:value="1"/>
        <label class="turn-1" for="block1-3-3"></label>
        <input class="player-2 left first-column top first-row first-diagonal turn-2" id="block2-1-1" type="radio" v-model="play[1].a3" v-bind:value="1"/>
        <label class="turn-2" for="block2-1-1"></label>
        <input class="player-2 middle second-column top first-row turn-2" id="block2-1-2" type="radio" v-model="play[1].b3" v-bind:value="1"/>
        <label class="turn-2" for="block2-1-2"></label>
        <input class="player-2 right third-column top first-row second-diagonal turn-2" id="block2-1-3" type="radio" v-model="play[1].c3" v-bind:value="1"/>
        <label class="turn-2" for="block2-1-3"></label>
        <input class="player-2 left first-column center second-row turn-2" id="block2-2-1" type="radio" v-model="play[1].a2" v-bind:value="1"/>
        <label class="turn-2" for="block2-2-1"></label>
        <input class="player-2 middle second-column center second-row first-diagonal second-diagonal turn-2" id="block2-2-2" type="radio" v-model="play[1].b2" v-bind:value="1"/>
        <label class="turn-2" for="block2-2-2"></label>
        <input class="player-2 right third-column center second-row turn-2" id="block2-2-3" type="radio" v-model="play[1].c2" v-bind:value="1"/>
        <label class="turn-2" for="block2-2-3"></label>
        <input class="player-2 left first-column bottom third-row second-diagonal turn-2" id="block2-3-1" type="radio" v-model="play[1].a1" v-bind:value="1"/>
        <label class="turn-2" for="block2-3-1"></label>
        <input class="player-2 middle second-column bottom third-row turn-2" id="block2-3-2" type="radio" v-model="play[1].b1" v-bind:value="1"/>
        <label class="turn-2" for="block2-3-2"></label>
        <input class="player-2 right third-column bottom third-row first-diagonal turn-2" id="block2-3-3" type="radio" v-model="play[1].c1" v-bind:value="1"/>
        <label class="turn-2" for="block2-3-3"></label>
        <input class="player-1 left first-column top first-row first-diagonal turn-3" id="block3-1-1" type="radio" v-model="play[2].a3" v-bind:value="1"/>
        <label class="turn-3" for="block3-1-1"></label>
        <input class="player-1 middle second-column top first-row turn-3" id="block3-1-2" type="radio" v-model="play[2].b3" v-bind:value="1"/>
        <label class="turn-3" for="block3-1-2"></label>
        <input class="player-1 right third-column top first-row second-diagonal turn-3" id="block3-1-3" type="radio" v-model="play[2].c3" v-bind:value="1"/>
        <label class="turn-3" for="block3-1-3"></label>
        <input class="player-1 left first-column center second-row turn-3" id="block3-2-1" type="radio" v-model="play[2].a2" v-bind:value="1"/>
        <label class="turn-3" for="block3-2-1"></label>
        <input class="player-1 middle second-column center second-row first-diagonal second-diagonal turn-3" id="block3-2-2" type="radio" v-model="play[2].b2" v-bind:value="1"/>
        <label class="turn-3" for="block3-2-2"></label>
        <input class="player-1 right third-column center second-row turn-3" id="block3-2-3" type="radio" v-model="play[2].c2" v-bind:value="1"/>
        <label class="turn-3" for="block3-2-3"></label>
        <input class="player-1 left first-column bottom third-row second-diagonal turn-3" id="block3-3-1" type="radio" v-model="play[2].a1" v-bind:value="1"/>
        <label class="turn-3" for="block3-3-1"></label>
        <input class="player-1 middle second-column bottom third-row turn-3" id="block3-3-2" type="radio" v-model="play[2].b1" v-bind:value="1" />
        <label class="turn-3" for="block3-3-2"></label>
        <input class="player-1 right third-column bottom third-row first-diagonal turn-3" id="block3-3-3" type="radio" v-model="play[2].c1" v-bind:value="1"/>
        <label class="turn-3" for="block3-3-3"></label>
        <input class="player-2 left first-column top first-row first-diagonal turn-4" id="block4-1-1" type="radio" v-model="play[3].a3" v-bind:value="1"/>
        <label class="turn-4" for="block4-1-1"></label>
        <input class="player-2 middle second-column top first-row turn-4" id="block4-1-2" type="radio" v-model="play[3].b3" v-bind:value="1"/>
        <label class="turn-4" for="block4-1-2"></label>
        <input class="player-2 right third-column top first-row second-diagonal turn-4" id="block4-1-3" type="radio" v-model="play[3].c3" v-bind:value="1"/>
        <label class="turn-4" for="block4-1-3"></label>
        <input class="player-2 left first-column center second-row turn-4" id="block4-2-1" type="radio" v-model="play[3].a2" v-bind:value="1"/>
        <label class="turn-4" for="block4-2-1"></label>
        <input class="player-2 middle second-column center second-row first-diagonal second-diagonal turn-4" id="block4-2-2" type="radio" v-model="play[3].b2" v-bind:value="1"/>
        <label class="turn-4" for="block4-2-2"></label>
        <input class="player-2 right third-column center second-row turn-4" id="block4-2-3" type="radio" v-model="play[3].c2" v-bind:value="1"/>
        <label class="turn-4" for="block4-2-3"></label>
        <input class="player-2 left first-column bottom third-row second-diagonal turn-4" id="block4-3-1" type="radio" v-model="play[3].a1" v-bind:value="1"/>
        <label class="turn-4" for="block4-3-1"></label>
        <input class="player-2 middle second-column bottom third-row turn-4" id="block4-3-2" type="radio" v-model="play[3].b1" v-bind:value="1"/>
        <label class="turn-4" for="block4-3-2"></label>
        <input class="player-2 right third-column bottom third-row first-diagonal turn-4" id="block4-3-3" type="radio" v-model="play[3].c1" v-bind:value="1"/>
        <label class="turn-4" for="block4-3-3"></label>
        <input class="player-1 left first-column top first-row first-diagonal turn-5" id="block5-1-1" type="radio" v-model="play[4].a3" v-bind:value="1"/>
        <label class="turn-5" for="block5-1-1"></label>
        <input class="player-1 middle second-column top first-row turn-5" id="block5-1-2" type="radio" v-model="play[4].b3" v-bind:value="1"/>
        <label class="turn-5" for="block5-1-2"></label>
        <input class="player-1 right third-column top first-row second-diagonal turn-5" id="block5-1-3" type="radio" v-model="play[4].c3" v-bind:value="1"/>
        <label class="turn-5" for="block5-1-3"></label>
        <input class="player-1 left first-column center second-row turn-5" id="block5-2-1" type="radio" v-model="play[4].a2" v-bind:value="1"/>
        <label class="turn-5" for="block5-2-1"></label>
        <input class="player-1 middle second-column center second-row first-diagonal second-diagonal turn-5" id="block5-2-2" type="radio" v-model="play[4].b2" v-bind:value="1"/>
        <label class="turn-5" for="block5-2-2"></label>
        <input class="player-1 right third-column center second-row turn-5" id="block5-2-3" type="radio" v-model="play[4].c2" v-bind:value="1"/>
        <label class="turn-5" for="block5-2-3"></label>
        <input class="player-1 left first-column bottom third-row second-diagonal turn-5" id="block5-3-1" type="radio" v-model="play[4].a1" v-bind:value="1"/>
        <label class="turn-5" for="block5-3-1"></label>
        <input class="player-1 middle second-column bottom third-row turn-5" id="block5-3-2" type="radio"  v-model="play[4].b1" v-bind:value="1"/>
        <label class="turn-5" for="block5-3-2"></label>
        <input class="player-1 right third-column bottom third-row first-diagonal turn-5" id="block5-3-3" type="radio" v-model="play[4].c1" v-bind:value="1"/>
        <label class="turn-5" for="block5-3-3"></label>
        <input class="player-2 left first-column top first-row first-diagonal turn-6" id="block6-1-1" type="radio" v-model="play[5].a3" v-bind:value="1"/>
        <label class="turn-6" for="block6-1-1"></label>
        <input class="player-2 middle second-column top first-row turn-6" id="block6-1-2" type="radio" v-model="play[5].b3" v-bind:value="1"/>
        <label class="turn-6" for="block6-1-2"></label>
        <input class="player-2 right third-column top first-row second-diagonal turn-6" id="block6-1-3" type="radio" v-model="play[5].c3" v-bind:value="1"/>
        <label class="turn-6" for="block6-1-3"></label>
        <input class="player-2 left first-column center second-row turn-6" id="block6-2-1" type="radio" v-model="play[5].a2" v-bind:value="1"/>
        <label class="turn-6" for="block6-2-1"></label>
        <input class="player-2 middle second-column center second-row first-diagonal second-diagonal turn-6" id="block6-2-2" type="radio" v-model="play[5].b2" v-bind:value="1"/>
        <label class="turn-6" for="block6-2-2"></label>
        <input class="player-2 right third-column center second-row turn-6" id="block6-2-3" type="radio" v-model="play[5].c2" v-bind:value="1"/>
        <label class="turn-6" for="block6-2-3"></label>
        <input class="player-2 left first-column bottom third-row second-diagonal turn-6" id="block6-3-1" type="radio" v-model="play[5].a1" v-bind:value="1"/>
        <label class="turn-6" for="block6-3-1"></label>
        <input class="player-2 middle second-column bottom third-row turn-6" id="block6-3-2" type="radio" v-model="play[5].b1" v-bind:value="1"/>
        <label class="turn-6" for="block6-3-2"></label>
        <input class="player-2 right third-column bottom third-row first-diagonal turn-6" id="block6-3-3" type="radio"  v-model="play[5].c1" v-bind:value="1"/>
        <label class="turn-6" for="block6-3-3"></label>
        <input class="player-1 left first-column top first-row first-diagonal turn-7" id="block7-1-1" type="radio" v-model="play[6].a3" v-bind:value="1"/>
        <label class="turn-7" for="block7-1-1"></label>
        <input class="player-1 middle second-column top first-row turn-7" id="block7-1-2" type="radio" v-model="play[6].b3" v-bind:value="1"/>
        <label class="turn-7" for="block7-1-2"></label>
        <input class="player-1 right third-column top first-row second-diagonal turn-7" id="block7-1-3" type="radio" v-model="play[6].c3" v-bind:value="1" />
        <label class="turn-7" for="block7-1-3"></label>
        <input class="player-1 left first-column center second-row turn-7" id="block7-2-1" type="radio"  v-model="play[6].a2" v-bind:value="1"/>
        <label class="turn-7" for="block7-2-1"></label>
        <input class="player-1 middle second-column center second-row first-diagonal second-diagonal turn-7" id="block7-2-2" type="radio" v-model="play[6].b2" v-bind:value="1"/>
        <label class="turn-7" for="block7-2-2"></label>
        <input class="player-1 right third-column center second-row turn-7" id="block7-2-3" type="radio" v-model="play[6].c2" v-bind:value="1"/>
        <label class="turn-7" for="block7-2-3"></label>
        <input class="player-1 left first-column bottom third-row second-diagonal turn-7" id="block7-3-1" type="radio" v-model="play[6].a1" v-bind:value="1"/>
        <label class="turn-7" for="block7-3-1"></label>
        <input class="player-1 middle second-column bottom third-row turn-7" id="block7-3-2" type="radio" v-model="play[6].b1" v-bind:value="1"/>
        <label class="turn-7" for="block7-3-2"></label>
        <input class="player-1 right third-column bottom third-row first-diagonal turn-7" id="block7-3-3" type="radio" v-model="play[6].c1" v-bind:value="1"/>
        <label class="turn-7" for="block7-3-3"></label>
        <input class="player-2 left first-column top first-row first-diagonal turn-8" id="block8-1-1" type="radio" v-model="play[7].a3" v-bind:value="1"/>
        <label class="turn-8" for="block8-1-1"></label>
        <input class="player-2 middle second-column top first-row turn-8" id="block8-1-2" type="radio" v-model="play[7].b3" v-bind:value="1"/>
        <label class="turn-8" for="block8-1-2"></label>
        <input class="player-2 right third-column top first-row second-diagonal turn-8" id="block8-1-3" type="radio" v-model="play[7].c3" v-bind:value="1"/>
        <label class="turn-8" for="block8-1-3"></label>
        <input class="player-2 left first-column center second-row turn-8" id="block8-2-1" type="radio" v-model="play[7].a2" v-bind:value="1"/>
        <label class="turn-8" for="block8-2-1"></label>
        <input class="player-2 middle second-column center second-row first-diagonal second-diagonal turn-8" id="block8-2-2" type="radio" v-model="play[7].b2" v-bind:value="1"/>
        <label class="turn-8" for="block8-2-2"></label>
        <input class="player-2 right third-column center second-row turn-8" id="block8-2-3" type="radio" v-model="play[7].c2" v-bind:value="1"/>
        <label class="turn-8" for="block8-2-3"></label>
        <input class="player-2 left first-column bottom third-row second-diagonal turn-8" id="block8-3-1" type="radio" v-model="play[7].a1" v-bind:value="1"/>
        <label class="turn-8" for="block8-3-1"></label>
        <input class="player-2 middle second-column bottom third-row turn-8" id="block8-3-2" type="radio" v-model="play[7].b1" v-bind:value="1"/>
        <label class="turn-8" for="block8-3-2"></label>
        <input class="player-2 right third-column bottom third-row first-diagonal turn-8" id="block8-3-3" type="radio" v-model="play[7].c1" v-bind:value="1"/>
        <label class="turn-8" for="block8-3-3"></label>
        <input class="player-1 left first-column top first-row first-diagonal turn-9" id="block9-1-1" type="radio" v-model="play[8].a3" v-bind:value="1"/>
        <label class="turn-9" for="block9-1-1"></label>
        <input class="player-1 middle second-column top first-row turn-9" id="block9-1-2" type="radio" v-model="play[8].b3" v-bind:value="1"/>
        <label class="turn-9" for="block9-1-2"></label>
        <input class="player-1 right third-column top first-row second-diagonal turn-9" id="block9-1-3" type="radio"  v-model="play[8].c3" v-bind:value="1"/>
        <label class="turn-9" for="block9-1-3"></label>
        <input class="player-1 left first-column center second-row turn-9" id="block9-2-1" type="radio" v-model="play[8].a2" v-bind:value="1"/>
        <label class="turn-9" for="block9-2-1"></label>
        <input class="player-1 middle second-column center second-row first-diagonal second-diagonal turn-9" id="block9-2-2" type="radio" v-model="play[8].b2" v-bind:value="1"/>
        <label class="turn-9" for="block9-2-2"></label>
        <input class="player-1 right third-column center second-row turn-9" id="block9-2-3" type="radio" v-model="play[8].c2" v-bind:value="1"/>
        <label class="turn-9" for="block9-2-3"></label>
        <input class="player-1 left first-column bottom third-row second-diagonal turn-9" id="block9-3-1" type="radio" v-model="play[8].a1" v-bind:value="1"/>
        <label class="turn-9" for="block9-3-1"></label>
        <input class="player-1 middle second-column bottom third-row turn-9" id="block9-3-2" type="radio" v-model="play[8].b1" v-bind:value="1"/>
        <label class="turn-9" for="block9-3-2"></label>
        <input class="player-1 right third-column bottom third-row first-diagonal turn-9" id="block9-3-3" type="radio" v-model="play[8].c1" v-bind:value="1"/>
        <label class="turn-9" for="block9-3-3"></label>
        <div class="end"><h3></h3></div>
      </div>
      <div class="q-pa-xl">

        <div class="q-gutter-y-lg">
          <q-btn  color="primary" :label="buttonLabel" @click="callLocalModel"></q-btn>&nbsp;
          <div v-if="inferenceTime">{{ inferenceTime }} ms for inference</div>
          <!--q-toggle v-model="mcts" color="grey" >
          <template v-slot> <span style="color: grey" v-html="toggleLabel"></span></template>
          </q-toggle-->
          <!--q-input filled v-model="playJson" label="enter the moves here (or click on the board)" error-message="Please check input" :error="!isValid" hint="try comma separated actions like a1, b2" /-->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mathUtils, runModelUtils } from '../../../utils'
import { Tensor, InferenceSession } from 'onnxruntime-web'
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      modelFilepath: '/onnx/MuZero-TicTacToe-InitialInference.onnx',
      modelFile: undefined,
      sessionBackend: 'wasm',
      session: InferenceSession,
      gpuSession: InferenceSession | undefined,
      cpuSession: InferenceSession | undefined,
      inferenceTime: undefined,
      p: undefined,
      v: undefined,
      s: undefined,
      mcts: false,
      gameover: false,
      play: [
        { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 },
        { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 },
        { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 },
        { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 },
        { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 },
        { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 },
        { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 },
        { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 },
        { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 }
      ]
    }
  },
  watch: {
    play: {
      handler: function () {
        this.gameover = this.checkGameover()
      },
      deep: true
    }
  },
  computed: {
    toggleLabel () {
      return this.mcts ? 'thinking fast or <b>slow</b>' : 'thinking <b>fast</b> or slow'
    },
    buttonLabel () {
      return this.gameover ? 'New game' : 'Next move from AI'
    },
    isValid () {
      if (this.playJson.trim() === '') return true
      const actionList = this.parseActionList(this.playJson)
      const keys = [ 'a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3' ]
      return actionList.every(
        action => keys.includes(action.trim())
      )
    },
    playJson: {
      get () {
        const actionList = []
        this.play.forEach(function (obj, index) {
          Object.entries(obj).forEach(([ key, value ]) => {
            if (value === 1) {
              actionList.push(key)
            }
          })
        })
        return JSON.stringify(actionList).replace(/' '|]|[[]|["]/g, '').replace(/,/g, ', ')
      },
      set (val) {
        let keys = [ 'a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3' ]
        const actionList = this.parseActionList(val)
        const playList = []
        let ok = true
        actionList.forEach(function (element, index) {
          const obj = { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 }
          element = element.trim()
          if (element.length === 2) {
            obj[ element ] = 1
            playList.push(obj)
            keys = keys.filter(item => item !== element)
          }
          else {
            ok = false
          }
        })
        if (val.trim() === '') {
          ok = true
        }
        if (!ok) return
        keys.forEach(function (element, index) {
          const obj = { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 }
          playList.push(obj)
        })
        this.play = playList
      }
    }
  },
  async created () {
    // fetch the model file to be used later
    const response = await fetch(this.modelFilepath)
    this.modelFile = await response.arrayBuffer()
    try {
      await this.initSession()
    }
    catch (e) {
      this.sessionBackend = 'wasm'
    }
  },
  methods: {
    async initSession () {
      // debugger
      this.sessionRunning = false
      this.modelLoadingError = false
      if (this.sessionBackend === 'webgl') {
        if (this.gpuSession) {
          this.session = this.gpuSession
          return
        }
        this.modelLoading = true
        this.modelInitializing = true
      }
      if (this.sessionBackend === 'wasm') {
        if (this.cpuSession) {
          this.session = this.cpuSession
          return
        }
        this.modelLoading = true
        this.modelInitializing = true
      }

      try {
        if (this.sessionBackend === 'webgl') {
          this.gpuSession = await runModelUtils.createModelGpu(this.modelFile)
          this.session = this.gpuSession
        }
        else if (this.sessionBackend === 'wasm') {
          this.cpuSession = await runModelUtils.createModelCpu(this.modelFile)
          this.session = this.cpuSession
        }
      }
      catch (e) {
        this.modelLoading = false
        this.modelInitializing = false
        if (this.sessionBackend === 'webgl') {
          this.gpuSession = undefined
        }
        else {
          this.cpuSession = undefined
        }
        console.log(e.toString())
        throw new Error('Error: Backend not supported. ')
      }
      this.modelLoading = false
      // warm up session with a sample tensor. Use setTimeout(..., 0) to make it an async execution so
      // that UI update can be done.
      if (this.sessionBackend === 'webgl') {
        setTimeout(() => {
          runModelUtils.warmupModel(this.session, [[ 1, 3, 3, 3 ]])
          this.modelInitializing = false
        }, 0)
      }
      else {
        await runModelUtils.warmupModel(this.session, [[ 1, 3, 3, 3 ]])
        this.modelInitializing = false
      }
    },
    allowedActions () {
      const allowed = []
      const board_ = this.board()
      const board = [ 'a3', 'b3', 'c3', 'a2', 'b2', 'c2', 'a1', 'b1', 'c1' ].map(function (e) {
        return board_[ e ]
      })
      for (let i = 0, len = board.length; i < len; i++) {
        if (board[ i ] === 0) {
          allowed.push(i)
        }
      }
      return allowed
    },
    preprocess () {
      const input = new Float32Array(27)

      let count = 0
      const board_ = this.board()
      const board = [ 'a3', 'b3', 'c3', 'a2', 'b2', 'c2', 'a1', 'b1', 'c1' ].map(function (e) {
        return board_[ e ]
      })
      let a = 0
      let b = 9
      for (let i = 0, len = board.length; i < len; i++) {
        if (board[ i ] === 1) {
          count++
        }
        else if (board[ i ] === -1) {
          count++
        }
      }
      if (count % 2 !== 0) {
        for (let i = 0; i < 9; i++) {
          input[ 18 + i ] = 1
        }
        a = 9
        b = 0
      }
      for (let i = 0, len = board.length; i < len; i++) {
        if (board[ i ] === 1) {
          input[ i + a ] = 1
        }
        else if (board[ i ] === -1) {
          input[ i + b ] = 1
        }
      }
      const tensor = new Tensor('float32', input, [ 1, 3, 3, 3 ])
      return tensor
    },
    softmax (tensor) {
      return mathUtils.softmax(Array.prototype.slice.call(tensor.data))
    },
    checkGameover () {
      // debugger
      const board = this.board()
      if (this.freemoves(board) === 0) return true
      if (this.wins(board, 1)) return true
      if (this.wins(board, -1)) return true
      return false
    },
    freemoves (board) {
      let freemoves = 0
      // debugger
      Object.entries(board).forEach(([ key, value ]) => {
        if (value === 0) {
          freemoves++
        }
      })
      return freemoves
    },
    wins (board, player) {
      if (board.a1 === player && board.a2 === player && board.a3 === player) return true
      if (board.b1 === player && board.b2 === player && board.b3 === player) return true
      if (board.c1 === player && board.c2 === player && board.c3 === player) return true
      if (board.a1 === player && board.b1 === player && board.c1 === player) return true
      if (board.a2 === player && board.b2 === player && board.c2 === player) return true
      if (board.a3 === player && board.b3 === player && board.c3 === player) return true
      if (board.a1 === player && board.b2 === player && board.c3 === player) return true
      if (board.c1 === player && board.b2 === player && board.a3 === player) return true
      return false
    },
    board () {
      const board = { a1: 0, a2: 0, a3: 0, b1: 0, b2: 0, b3: 0, c1: 0, c2: 0, c3: 0 }
      let player = -1
      this.play.forEach(function (obj, index) {
        player *= -1
        Object.entries(obj).forEach(([ key, value ]) => {
          if (value === 1) {
            board[ key ] = player
          }
        })
      })
      return board
    },
    parseActionList (raw) {
      const actionList = JSON.parse('["' + raw.replace(/,/g, '","').replace(/' '/g, '') + '"]')
      const newActionList = []
      actionList.forEach(function (element, index) {
        const element2 = element.trim()
        if (element2.length === 2) {
          newActionList.push(element2)
        }
      })
      return newActionList
    },
    sample (p) {
      const sum = p.reduce((a, b) => a + b, 0)
      const normalized = p.map(prob => prob / sum)
      const sample = Math.random()
      let total = 0
      for (let i = 0; i < normalized.length; i++) {
        total += normalized[ i ]
        if (sample < total) return i
      }
    },
    async callLocalModel () {
      if (this.gameover) {
        this.playJson = ''
        return
      }
      this.sessionRunning = true
      const tensor = this.preprocess()
      const [ res, time ] = await runModelUtils.runModel(this.session, [tensor])
      this.s = res[ 0 ]
      this.p = this.softmax(res[ 1 ])
      this.v = res[ 2 ]
      const allowedActions = this.allowedActions()
      let maxIndex = 0

      // for loop this.p
      let trustLevel = 0.05;
      for (let a = 0; a < this.p.length; a++) {
        if (this.p[ a ] < trustLevel) {
          this.p[ a ] = 0;
        }
      }
      let sum = 0;
      for (let a = 0; a < this.p.length; a++) {
        sum += this.p[ a ];
      }
      for (let a = 0; a < this.p.length; a++) {
        this.p[ a ] = this.p[ a ]/sum;
      }
      maxIndex = this.sample(this.p)
      this.inferenceTime = time
      this.sessionRunning = false
      const keys = [ 'a3', 'b3', 'c3', 'a2', 'b2', 'c2', 'a1', 'b1', 'c1' ]
      const move = keys[ maxIndex ]
      if (this.playJson.trim().length === 0) {
        this.playJson = move
      }
      else {
        this.playJson = this.playJson + ',' + move
      }
    }
  }
})
</script>
<style>

.tic-tac-toe-container {
  color: #b6b5ca;
  font-family: 'Arial', sans-serif;
  margin: 0;
  text-align: center;
  line-height: normal;
}

h5 {
  font-weight: 400;
  padding: 0 20px;
}

.tic-tac-toe {
  font-family: 'Open Sans', sans-serif;
  height: 300px;
  overflow: hidden;
  margin: 50px auto 30px auto;
  position: relative;
  width: 300px;
}
@media (min-width: 450px) {
  .tic-tac-toe {
    height: 450px;
    width: 450px;
  }
}
.tic-tac-toe input[type="radio"] {
  display: none;
}
.tic-tac-toe input[type="radio"]:checked + label {
  cursor: default;
  z-index: 10 !important;
}
.tic-tac-toe input[type="radio"].player-1 + label:after {
  content: "";
}
.tic-tac-toe input[type="radio"].player-2 + label:after {
  content: "";
}
.tic-tac-toe input[type="radio"].player-1:checked + label:after, .tic-tac-toe input[type="radio"].player-2:checked + label:after {
  opacity: 1;
}
.tic-tac-toe input[type="radio"].player-1:checked + label {
  background-color: #dc685a;
}
.tic-tac-toe input[type="radio"].player-2:checked + label {
  background-color: #ecaf4f;
}
.tic-tac-toe input[type="radio"].turn-1 + label {
  z-index: 1;
}
.tic-tac-toe input[type="radio"].turn-2 + label {
  z-index: 2;
}
.tic-tac-toe input[type="radio"].turn-3 + label {
  z-index: 3;
}
.tic-tac-toe input[type="radio"].turn-4 + label {
  z-index: 4;
}
.tic-tac-toe input[type="radio"].turn-5 + label {
  z-index: 5;
}
.tic-tac-toe input[type="radio"].turn-6 + label {
  z-index: 6;
}
.tic-tac-toe input[type="radio"].turn-7 + label {
  z-index: 7;
}
.tic-tac-toe input[type="radio"].turn-8 + label {
  z-index: 8;
}
.tic-tac-toe input[type="radio"].turn-9 + label {
  z-index: 9;
}
.tic-tac-toe input[type="radio"].turn-1 + label {
  display: block;
}
.tic-tac-toe input[type="radio"].turn-1:checked ~ .turn-2 + label {
  display: block;
}
.tic-tac-toe input[type="radio"].turn-2:checked ~ .turn-3 + label {
  display: block;
}
.tic-tac-toe input[type="radio"].turn-3:checked ~ .turn-4 + label {
  display: block;
}
.tic-tac-toe input[type="radio"].turn-4:checked ~ .turn-5 + label {
  display: block;
}
.tic-tac-toe input[type="radio"].turn-5:checked ~ .turn-6 + label {
  display: block;
}
.tic-tac-toe input[type="radio"].turn-6:checked ~ .turn-7 + label {
  display: block;
}
.tic-tac-toe input[type="radio"].turn-7:checked ~ .turn-8 + label {
  display: block;
}
.tic-tac-toe input[type="radio"].turn-8:checked ~ .turn-9 + label {
  display: block;
}
.tic-tac-toe input[type="radio"].left + label {
  left: 0;
}
.tic-tac-toe input[type="radio"].top + label {
  top: 0;
}
.tic-tac-toe input[type="radio"].middle + label {
  left: 100px;
}
.tic-tac-toe input[type="radio"].right + label {
  left: 200px;
}
.tic-tac-toe input[type="radio"].center + label {
  top: 100px;
}
.tic-tac-toe input[type="radio"].bottom + label {
  top: 200px;
}
@media (min-width: 450px) {
  .tic-tac-toe input[type="radio"].middle + label {
    left: 150px;
  }
  .tic-tac-toe input[type="radio"].right + label {
    left: 300px;
  }
  .tic-tac-toe input[type="radio"].center + label {
    top: 150px;
  }
  .tic-tac-toe input[type="radio"].bottom + label {
    top: 300px;
  }
}
.tic-tac-toe input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~
input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~
input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ .end {
  display: block;
}
.tic-tac-toe input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~
input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~
input[type="radio"]:checked ~ input[type="radio"]:checked ~ input[type="radio"]:checked ~ .end > h3:before {
  content: "It is a tie!";
}
.tic-tac-toe .player-1.first-column:checked ~ .player-1.first-column:checked ~ .player-1.first-column:checked ~ .end,
.tic-tac-toe .player-1.second-column:checked ~ .player-1.second-column:checked ~ .player-1.second-column:checked ~ .end,
.tic-tac-toe .player-1.third-column:checked ~ .player-1.third-column:checked ~ .player-1.third-column:checked ~ .end,
.tic-tac-toe .player-1.first-row:checked ~ .player-1.first-row:checked ~ .player-1.first-row:checked ~ .end,
.tic-tac-toe .player-1.second-row:checked ~ .player-1.second-row:checked ~ .player-1.second-row:checked ~ .end,
.tic-tac-toe .player-1.third-row:checked ~ .player-1.third-row:checked ~ .player-1.third-row:checked ~ .end,
.tic-tac-toe .player-1.first-diagonal:checked ~ .player-1.first-diagonal:checked ~ .player-1.first-diagonal:checked ~ .end,
.tic-tac-toe .player-1.second-diagonal:checked ~ .player-1.second-diagonal:checked ~ .player-1.second-diagonal:checked ~ .end {
  display: block;
}
.tic-tac-toe .player-1.first-column:checked ~ .player-1.first-column:checked ~ .player-1.first-column:checked ~ .end h3:before,
.tic-tac-toe .player-1.second-column:checked ~ .player-1.second-column:checked ~ .player-1.second-column:checked ~ .end h3:before,
.tic-tac-toe .player-1.third-column:checked ~ .player-1.third-column:checked ~ .player-1.third-column:checked ~ .end h3:before,
.tic-tac-toe .player-1.first-row:checked ~ .player-1.first-row:checked ~ .player-1.first-row:checked ~ .end h3:before,
.tic-tac-toe .player-1.second-row:checked ~ .player-1.second-row:checked ~ .player-1.second-row:checked ~ .end h3:before,
.tic-tac-toe .player-1.third-row:checked ~ .player-1.third-row:checked ~ .player-1.third-row:checked ~ .end h3:before,
.tic-tac-toe .player-1.first-diagonal:checked ~ .player-1.first-diagonal:checked ~ .player-1.first-diagonal:checked ~ .end h3:before,
.tic-tac-toe .player-1.second-diagonal:checked ~ .player-1.second-diagonal:checked ~ .player-1.second-diagonal:checked ~ .end h3:before {
  content: "Player 1 wins!" !important;
}
.tic-tac-toe .player-2.first-column:checked ~ .player-2.first-column:checked ~ .player-2.first-column:checked ~ .end,
.tic-tac-toe .player-2.second-column:checked ~ .player-2.second-column:checked ~ .player-2.second-column:checked ~ .end,
.tic-tac-toe .player-2.third-column:checked ~ .player-2.third-column:checked ~ .player-2.third-column:checked ~ .end,
.tic-tac-toe .player-2.first-row:checked ~ .player-2.first-row:checked ~ .player-2.first-row:checked ~ .end,
.tic-tac-toe .player-2.second-row:checked ~ .player-2.second-row:checked ~ .player-2.second-row:checked ~ .end,
.tic-tac-toe .player-2.third-row:checked ~ .player-2.third-row:checked ~ .player-2.third-row:checked ~ .end,
.tic-tac-toe .player-2.first-diagonal:checked ~ .player-2.first-diagonal:checked ~ .player-2.first-diagonal:checked ~ .end,
.tic-tac-toe .player-2.second-diagonal:checked ~ .player-2.second-diagonal:checked ~ .player-2.second-diagonal:checked ~ .end {
  display: block;
}
.tic-tac-toe .player-2.first-column:checked ~ .player-2.first-column:checked ~ .player-2.first-column:checked ~ .end h3:before,
.tic-tac-toe .player-2.second-column:checked ~ .player-2.second-column:checked ~ .player-2.second-column:checked ~ .end h3:before,
.tic-tac-toe .player-2.third-column:checked ~ .player-2.third-column:checked ~ .player-2.third-column:checked ~ .end h3:before,
.tic-tac-toe .player-2.first-row:checked ~ .player-2.first-row:checked ~ .player-2.first-row:checked ~ .end h3:before,
.tic-tac-toe .player-2.second-row:checked ~ .player-2.second-row:checked ~ .player-2.second-row:checked ~ .end h3:before,
.tic-tac-toe .player-2.third-row:checked ~ .player-2.third-row:checked ~ .player-2.third-row:checked ~ .end h3:before,
.tic-tac-toe .player-2.first-diagonal:checked ~ .player-2.first-diagonal:checked ~ .player-2.first-diagonal:checked ~ .end h3:before,
.tic-tac-toe .player-2.second-diagonal:checked ~ .player-2.second-diagonal:checked ~ .player-2.second-diagonal:checked ~ .end h3:before {
  content: "Player 2 wins!" !important;
}
.tic-tac-toe label {
  background-color: #e6f1fc;
  border-radius: 14px;
  cursor: pointer;
  color: #fff;
  display: none;
  height: 90px;
  margin: 5px;
  position: absolute;
  width: 90px;
  -moz-transition: background-color 0.3s;
  -o-transition: background-color 0.3s;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
}
@media (min-width: 450px) {
  .tic-tac-toe label {
    height: 140px;
    width: 140px;
  }
}
.tic-tac-toe label:hover {
  background-color: #3d4250;
}
.tic-tac-toe label:hover:after {
  opacity: .4;
}
.tic-tac-toe label:after {
  left: 0;
  font-family: "FontAwesome";
  font-size: 45px;
  margin-top: -22.5px;
  opacity: 0;
  position: absolute;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  top: 50%;
  width: 100%;
}
@media (min-width: 450px) {
  .tic-tac-toe label:after {
    font-size: 70px;
    margin-top: -35px;
  }
}
.tic-tac-toe .end {
  background: rgba(255, 255, 255, 0.8);
  bottom: 5px;
  color: #3d4250;
  display: none;
  left: 5px;
  padding-top: 55px;
  position: absolute;
  right: 5px;
  top: 5px;
  text-align: center;
  z-index: 11;
}
@media (min-width: 450px) {
  .tic-tac-toe .end {
    padding-top: 150px;
  }
}
.tic-tac-toe .end h3 {
  font-size: 30px;
  font-weight: 300;
}
@media (min-width: 450px) {
  .tic-tac-toe .end h3 {
    font-size: 40px;
  }
}
.tic-tac-toe .end a {
  background-color: #3d4250;
  border-radius: 4px;
  color: #fff;
  padding: 14px 45px;
  text-decoration: none;
  -moz-transition: background-color 0.2s;
  -o-transition: background-color 0.2s;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
}
.tic-tac-toe .end a:hover {
  background-color: #262934;
  cursor: pointer;
}
</style>
