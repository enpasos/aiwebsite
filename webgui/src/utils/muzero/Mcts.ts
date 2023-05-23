import {MctNode} from "src/utils/muzero/MctNode";
import {InferenceSession, Tensor} from "onnxruntime-web";
import {runModel} from "src/utils/runModel";
import {NetworkIO, NetworkIOBase} from "src/utils/muzero/NetworkIO";
import {GumbelSearch} from "src/utils/muzero/GumbelSearch";


export async function mctsRun(scale: number, size: number, sm: GumbelSearch, actionHistoryInput: number[], numSimulations: number, recurrentInference: InferenceSession): Promise<number> {


  do {
    const searchPath = sm.search()
    const networkOut = await recurrentInferenceRun(scale, recurrentInference, searchPath, size);

    sm.expandAndBackpropagate(networkOut)
    sm.next()

  } while (!sm.simulationsFinished);

  return sm.selectedAction
}


export function sigmas(qs: number[], maxActionVisitCount: number): number[] {
  return qs.map(q => sigma(q, maxActionVisitCount))
}

export function sigma(q: number, maxActionVisitCount: number): number {
  const cVisit = 15
  const cScale = 1
  return (cVisit + maxActionVisitCount) * cScale * q
}

export function actionSpaceSize(size: number): number {
  return size * size + 1
}

async function recurrentInferenceRun(scale: number, recurrentInference: InferenceSession, searchPath: MctNode[], size: number): Promise<NetworkIO> {
  let lastAction: number = searchPath[searchPath.length - 1].action;
  const s = actionSpaceSize(size)
  let actionArray: number[] = [];
  // TODO: check
  for (let i = 0; i < s - 1; i++) {  // if i = actionSpaceSize - 1  then leave all 0.0
    if (i == lastAction) {
      actionArray.push(1.0);
    } else {
      actionArray.push(0.0);
    }
  }
  const actionTensor: Tensor = new Tensor('float32', actionArray, [1, 1, size, size]);
  let parent: MctNode = searchPath[searchPath.length - 2];  // -2 to get the parent
  if (parent.hiddenState == undefined) throw new Error;

  const [res] = await runModel(recurrentInference, [parent.hiddenState, actionTensor]);
  // console.log("recurrentInference: " + time + " ms")

  return new NetworkIOBase(scale, res)
}
