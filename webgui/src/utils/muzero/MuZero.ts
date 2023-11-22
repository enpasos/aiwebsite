import {InferenceSession, Tensor} from "onnxruntime-web";
import {runModel} from "../runModel";
import {actionSpaceSize, mctsRun} from "src/utils/muzero/Mcts";
import {ActionPolicyValue, createActionPolicyValue} from "src/utils/muzero/ActionPolicyValue";
import {Player} from "src/utils/muzero/Player";
import {GumbelSearch, GumbelSearchBase} from "src/utils/muzero/GumbelSearch";
import {NetworkIOBase} from "src/utils/muzero/NetworkIO";


export async function runDecision(scale: number, size: number, initialInference: InferenceSession, recurrentInference: InferenceSession, inputTensors: [Tensor], actionHistory: number[], legalActions: number[], toPlay: Player, mcts: Boolean, numSimulations: number, valuePerspeciveCorrect: Boolean): Promise<[number, number, number]> {

  // console.log("legal actions: " + legalActions);
  const start = new Date();
  const [res] = await runModel(initialInference, inputTensors);
  //console.log("initialInference: " + time + " ms")

  const networkOut = new NetworkIOBase(scale, res)
  console.log(networkOut.value + " ...actionHistory.length " + actionHistory.length + " ...scale " + scale)
  var value = actionHistory.length % 2 == 0 ? networkOut.value : -networkOut.value;
  if (!valuePerspeciveCorrect) value = -value;

  let actionSelected: number = legalActions[0];
  if (legalActions.length > 1) {

    if (!mcts) {
      let actionPolicyValue: ActionPolicyValue[] = createActionPolicyValue(legalActions, networkOut.policy);
      actionSelected = selectActionByMax(actionPolicyValue)
    } else {
      let sm: GumbelSearch = new GumbelSearchBase(scale, toPlay, numSimulations, legalActions, actionSpaceSize(size))
      sm.expandRootNode(networkOut, legalActions, toPlay)
      sm.gumbelActionsStart()
      actionSelected = await mctsRun(scale, size, sm, actionHistory, numSimulations, recurrentInference);
    }
  }
    //console.log("actionSelected: " + actionSelected);
    const end = new Date();
    const totalTime = (end.getTime() - start.getTime());


  return [actionSelected, totalTime, value];
}




export function selectActionByMax(actionPolicyValues: ActionPolicyValue[]): number {
  let maxValue = 0;
  let maxNumber = -1;
  for (let a = 0; a < actionPolicyValues.length; a++) {
    const actionPolicyValue = actionPolicyValues[a];
    if (actionPolicyValue.policyValue > maxValue) {
      maxValue = actionPolicyValue.policyValue;
      maxNumber = actionPolicyValue.action;
    }
  }
  return maxNumber;
}





