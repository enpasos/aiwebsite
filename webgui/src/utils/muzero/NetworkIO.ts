import {Tensor} from "onnxruntime-web";
import {softmax} from "src/utils/math";

export interface NetworkIO {

  value: number
  reward: number
  policy: number[]
  logits: number[]
  hiddenState: Tensor | undefined
}


export class NetworkIOBase implements NetworkIO {
  value: number
  reward: number
  policy: number[]
  logits: number[]
  hiddenState: Tensor | undefined

  constructor(scale: number, res: Tensor[]) {
    this.reward = 0
    this.logits = Array.prototype.slice.call(res[1].data)
    this.policy = softmax(this.logits)
    this.hiddenState = res[0]
    const vRaw = Array.prototype.slice.call(res[2].data)[0];
    // debugger
    this.value = scale * vRaw;
  }

}
