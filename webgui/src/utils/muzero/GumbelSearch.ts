import {MctNode, MCTNodeBase} from "src/utils/muzero/MctNode";
import {SequentialHalving, SequentialHalvingBase} from "src/utils/muzero/SequentialHalving";
import {MinMaxStats, MinMaxStatsBase} from "src/utils/muzero/MinMaxStats";
import {Player} from "src/utils/muzero/Player";
import {NetworkIO} from "src/utils/muzero/NetworkIO";
import {sigma} from "src/utils/muzero/Mcts";

export interface GumbelSearch {
  selectedAction: number;
  actionSpaceSize: number
  allActions: number[]
  root: MctNode
  gumbelInfo: SequentialHalving
  simulationsFinished: boolean

  minMaxStats: MinMaxStats

  expandRootNode(networkOutput: NetworkIO, legalActions: number[], toPlay: Player): void

  gumbelActionsStart(): void

  initGumbel(): void

  search(): MctNode[]

  expandAndBackpropagate(networkOut: NetworkIO): void

  next(): void;
}


export class GumbelSearchBase implements GumbelSearch {

  selectedAction: number;
  actionSpaceSize: number
  allActions: number[]
  root: MctNode
  gumbelInfo: SequentialHalving
  simulationsFinished: boolean

  minMaxStats: MinMaxStats

  scale: number

  //rootChildrenCandidates: MctNode[]

  constructor(scale : number, toPlay: Player, numSimulations: number, legalActions: number[], actionSpaceSize: number) {
    this.scale = scale
    this.selectedAction = -1
    this.root = new MCTNodeBase(undefined, 0, 0, 0)
    this.root.root = true
    this.root.toPlay = toPlay

    const n: number = numSimulations
    const m: number = Math.min(n, 16);
    const k: number = legalActions.length;

    this.gumbelInfo = new SequentialHalvingBase(n, m, k);


    this.simulationsFinished = false

    this.minMaxStats = new MinMaxStatsBase(-1, 1);
    //this.rootChildrenCandidates = new Array()

    this.initGumbel();

    this.actionSpaceSize = actionSpaceSize

    this.allActions = new Array()
    for (let a = 0; a < actionSpaceSize; a++) {
      this.allActions.push(a)
    }
  }


  expandRootNode(networkOutput: NetworkIO, legalActions: number[], toPlay: Player) {
    if (legalActions.length < 2) {
      throw new Error("legal actions should be more than 1 at 'expandRootNode'")
    }
    this.root.expand(toPlay, legalActions, networkOutput);
  }

  initGumbel() {
    this.root.children.forEach((node, key) =>
      node.gumbel = -Math.log(-Math.log(Math.random()))
    )
  }


  search(): MctNode[] {
    const rootChild: MctNode = this.getCurrentRootChild()
    rootChild.searchPath = new Array()
    rootChild.searchPath.push(this.root)
    rootChild.searchPath.push(rootChild)
    let node = rootChild
    while (node.expanded()) {
      node = node.selectChild(this.minMaxStats);
      rootChild.searchPath.push(node);
    }
    return rootChild.searchPath;
  }


  gumbelActionsStart() {
    this.root.candidates = new Array()
    this.root.children.forEach((node, key) =>
      this.root.candidates.push(node)
    )
    this.root.candidates.forEach((node) =>
      node.drawValue = node.gumbel + node.logit
    )
    this.drawCandidates()
  }
  gumbelActionsOnPhaseChange() {
    //const oldCandidates  = this.root.candidates
    //this.root.candidates = new Array()
    const maxActionVisitCount = Math.max.apply(Math, this.root.candidates.map(function (n) {
      return n.visitCount
    }))
    this.root.candidates.forEach((node) =>
      node.drawValue = node.gumbel + node.logit + sigma(node.qValue(), maxActionVisitCount)
    )

    this.drawCandidates()
  }


  drawCandidates() {
    const newCandidates: MctNode[] = new Array()
    for (let i = 0; i < this.gumbelInfo.m; i++) {
      if (this.root.candidates.length == 0) {
        throw new Error("this.root.candidates.length == 0")
      }
      const candidate: MctNode = this.root.candidates.reduce(function (prev, current) {
        return (prev.drawValue > current.drawValue) ? prev : current
      })
      this.root.candidates = this.root.candidates.filter(obj => obj.action !== candidate.action);
      newCandidates.push(candidate)
    }
    this.root.candidates = newCandidates
  }

  expandAndBackpropagate(networkOut: NetworkIO): void {
    const searchPath = this.getCurrentSearchPath()
    let node = searchPath[searchPath.length - 1]
    if (node.parent == null) {
      throw new Error("only non root node on expandAndBackpropagate")
    }
    let toPlayOnNode = Player.otherPlayer(node.parent.toPlay)

    node.expand(toPlayOnNode, this.allActions, networkOut);

    this.backUp(searchPath, networkOut.value);

  }

  backUp(searchPath: MctNode[], value: number) {
    const toPlay: Player = searchPath[searchPath.length - 1].toPlay;
    for (let i = searchPath.length - 1; i >= 0; i--) {
      let node: MctNode = searchPath[i];
      if (node.toPlay == toPlay) {
        node.valueSum = node.valueSum + value;
      } else {
        node.valueSum = node.valueSum - value;
      }
      node.visitCount = node.visitCount + 1;
      value = node.reward + 1 * value;
      this.minMaxStats.update(value);
    }
  }

  next() {

         this.gumbelInfo.next();

        if (this.gumbelInfo.finished) {
          this.gumbelActionsOnPhaseChange();
          if (this.root.candidates.length > 1) {
            throw new Error("RootChildrenCandidates().size() > 1");
          }
          this.selectedAction = this.root.candidates[0].action;
          this.simulationsFinished = true;

        } else {
          if (this.gumbelInfo.phaseChanged ) {
            this.gumbelActionsOnPhaseChange();
          }
        }

  }



  private getCurrentRootChild(): MctNode {
    return this.root.candidates[this.gumbelInfo.im]
  }

  private getCurrentSearchPath() {
    const rootChild = this.getCurrentRootChild()
    return rootChild.searchPath
  }


}
