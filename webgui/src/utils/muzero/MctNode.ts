import {Tensor} from "onnxruntime-web"
import {MinMaxStats} from "src/utils/muzero/MinMaxStats"
import {Player} from "src/utils/muzero/Player"
import {NetworkIO} from "src/utils/muzero/NetworkIO";
import {softmax} from "src/utils/math";
import {sigmas} from "src/utils/muzero/Mcts";
import {ActionPolicyValue, createActionPolicyValue} from "src/utils/muzero/ActionPolicyValue";

export interface MctNode {
  parent: MctNode | undefined
  toPlay: Player
  action: number
  candidates: MctNode[]
  searchPath: MctNode[]
  prior: number
  valueFromNetwork: number
  improvedPolicyValue: number
  improvedPolicyValue2: number
  logit: number
  gumbel: number
  drawValue: number
  hiddenState: Tensor | undefined
  reward: number
  multiplierLambda: number
  valueSum: number
  visitCount: number
  root: boolean
  children: Map<number, MctNode> // number represents an action
  expanded(): Boolean

  value(): number

  valueScore(minMaxStats: MinMaxStats): number

  getCompletedQValues(minMaxStats: MinMaxStats): number[]

  getLogits(): number[]

  qValue(): number

  comparisonValue(nSum: number): number

  selectChild(minMaxStats: MinMaxStats): MctNode

  expand(toPlay: Player, actions: number[], networkOut: NetworkIO): void;
}

export class MCTNodeBase implements MctNode {
  parent: MctNode | undefined
  action: number
  candidates: MctNode[]
  searchPath: MctNode[]
  children: Map<number, MctNode>
  hiddenState: Tensor | undefined
  multiplierLambda: number
  prior: number
  valueFromNetwork: number
  improvedPolicyValue: number
  improvedPolicyValue2: number
  logit: number
  gumbel: number
  drawValue: number
  reward: number
  root: boolean
  toPlay: Player
  valueSum: number
  visitCount: number

  constructor(parent: MctNode | undefined, prior: number, logit: number, valueFromNetwork: number) {
    this.parent = parent
    this.action = -1
    this.candidates = new Array()
    this.searchPath = new Array()
    this.children = new Map<number, MctNode>()
    this.hiddenState = undefined
    this.multiplierLambda = 0
    this.prior = prior
    this.valueFromNetwork = valueFromNetwork
    this.improvedPolicyValue = 0
    this.improvedPolicyValue2 = 0
    this.logit = logit
    this.gumbel = 0
    this.drawValue = 0
    this.reward = 0
    this.root = false
    this.toPlay = Player.black
    this.valueSum = 0
    this.visitCount = 0
  }

  expanded(): Boolean {
    return this.children.size > 0
  }

  value(): number {
    if (this.visitCount == 0) return 0.0
    const rawValue = this.valueSum / this.visitCount
    //  return - rawValue
    return rawValue
  }

  valueScore(minMaxStats: MinMaxStats): number {
    return minMaxStats.normalize(this.reward + this.value())
  }

  getVmix(): number {

    const vHat = this.valueFromNetwork;
    if (this.visitCount == 0) return vHat;


    const children2 = Array.from(this.children.values())
    const b: number = children2.filter(node => node.visitCount > 0)
      .map(node => node.prior * node.qValue()).reduce((sum, current) => sum + current, 0)

    const c: number = children2.filter(node => node.visitCount > 0)
      .map(node => node.prior).reduce((sum, current) => sum + current, 0)

    const d: number = children2
      .map(node => node.visitCount).reduce((sum, current) => sum + current, 0)

    if (d == 0) return vHat; // no visits on the children
    const vmix: number = 1 / (1 + d) * (vHat + d / c * b);
    return vmix;

  }

  qValue(): number {
    return -this.value()
    // double value = value();
    // if (config.getPlayerMode() == PlayerMode.TWO_PLAYERS) {
    //   return -value;
    // } else {
    //   return value;
    // }
  }

  comparisonValue(nSum: number): number {
    return this.improvedPolicyValue - this.visitCount / (1.0 + nSum);
  }

  getCompletedQValues(minMaxStats: MinMaxStats): number[] {
    const vMix = this.getVmix()
    // console.log(vMix)
    const children2 = Array.from(this.children.values())
    return children2.map(child => {
        if (child.visitCount > 0) {
          return child.qValue();
        } else {
          return vMix;
        }
      }
    ).map(v => minMaxStats.normalize(v))
  }

  getLogits(): number[] {
    const children2 = Array.from(this.children.values())
    return children2.map(child =>
      child.logit
    )
  }


  updateImprovedPolicyValueOnChildren(minMaxStats: MinMaxStats) {
    const children2 = Array.from(this.children.values())
    const maxActionVisitCount = Math.max.apply(Math, children2.map(function (n) {
      return n.visitCount
    }))
    const logits = this.getLogits();
    const completedQs = this.getCompletedQValues(minMaxStats);
    const sigmas2 = sigmas(completedQs, maxActionVisitCount)
    const raw: number[] = new Array()
    for (let i = 0; i < sigmas2.length; i++) {
      raw.push(
        logits[i] + sigmas2[i]
      )
    }
    const improvedPolicy = softmax(raw)
    for (let i = 0; i < children2.length; i++) {
      children2[i].improvedPolicyValue = improvedPolicy[i]
    }

  }

  selectChild(minMaxStats: MinMaxStats): MctNode {

    this.updateImprovedPolicyValueOnChildren(minMaxStats)

    const children2 = Array.from(this.children.values())
    const nSum: number = children2.map(node => node.visitCount).reduce((sum, current) => sum + current, 0)

    children2.forEach(node => node.improvedPolicyValue2 = node.comparisonValue(nSum))
    const max = children2.reduce(function (prev, current) {
      return (prev.improvedPolicyValue2 > current.improvedPolicyValue2) ? prev : current
    })
    return max

  }


  expand(toPlay: Player, actions: number[], networkOut: NetworkIO) {
    this.valueFromNetwork = networkOut.value
    this.toPlay = toPlay
    this.hiddenState = networkOut.hiddenState
    this.reward = networkOut.reward


    let actionPolicyValues: ActionPolicyValue[] = createActionPolicyValue(actions, networkOut.policy);

    let policySum: number = actionPolicyValues.reduce((a, b) => a + b.policyValue, 0);

    for (let a = 0; a < actionPolicyValues.length; a++) {
      const pv: ActionPolicyValue = actionPolicyValues[a];
      let child: MctNode = new MCTNodeBase(this, pv.policyValue / policySum, networkOut.logits[a], 0);
      child.action = pv.action;
      child.root = false;
      child.toPlay = Player.otherPlayer(this.toPlay);
      this.children.set(pv.action, child)
    }

  }


}
