import {InferenceSession, Tensor} from 'onnxruntime-web';

function init() {
  // env.wasm.simd = false;
}

export async function createModelCpu(model: ArrayBuffer): Promise<InferenceSession> {
  init();
  return await InferenceSession.create(model, {executionProviders: ['wasm']});
}
export async function createModelGpu(model: ArrayBuffer): Promise<InferenceSession> {
  init();
  return await InferenceSession.create(model, {executionProviders: ['webgl']});
}

export async function warmupModel(model: InferenceSession, dimsArray:number[][]) {
  // OK. we generate a random input and call Session.run() as a warmup query
  const feeds: Record<string, Tensor> = {};
  for (let i = 0; i < dimsArray.length; i++) {
    const dims = dimsArray[0];
    const size = dims.reduce((a, b) => a * b);
    const warmupTensor = new Tensor('float32', new Float32Array(size), dims);
    for (let j = 0; j < size; j++) {
      warmupTensor.data[j] = Math.random() * 2.0 - 1.0;  // random value [-1.0, 1.0)
    }
    feeds[model.inputNames[i]] = warmupTensor;
  }

  try {
    await model.run(feeds);
  } catch (e) {
    //console.error(e);
  }
}


export async function runModel(model: InferenceSession, preprocessedData: Tensor[]): Promise<[Tensor[], number]> {
  const start = new Date();
  try {
    const feeds: Record<string, Tensor> = {};
    for (let i = 0; i < preprocessedData.length; i++) {
      feeds[model.inputNames[i]] = preprocessedData[i];
    }
    const outputData = await model.run(feeds);
    const end = new Date();
    const inferenceTime = (end.getTime() - start.getTime());
    var tensors:Tensor[] = [];
    model.outputNames.forEach( (name) => {
      tensors.push(outputData[name]);
    });
    return [tensors, inferenceTime];
  } catch (e) {
    console.error(e);
    throw new Error();
  }
}
