export interface SequentialHalving {

  phaseChanged: boolean
  m: number
  im: number
  phase: number
  extraVisit: number
  n: number;
  k: number;
  extraVisitsPerPhase: number[]
  finished: boolean

  next(): void;

  onFinishedM2One(): void
}

function extraPhaseVisitsToUpdateQPerPhase(budget: number, m: number) {

  var remainingBudget: number = budget
  const phases: number = Math.log2(m)
  const result: number[] = new Array(phases)

  for (let p = 0; p < phases; p++) {
    const na: number = Math.floor(budget / phases / m)
    if (p < phases - 1) {
      result[p] = na
      remainingBudget -= na * m
    } else {
      result[p] = remainingBudget / m
    }
    m /= 2
  }
  return result

}

export class SequentialHalvingBase implements SequentialHalving {
  phaseChanged: boolean
  m: number
  im: number
  phase: number
  extraVisit: number
  n: number;
  k: number;
  extraVisitsPerPhase: number[]
  finished: boolean

  constructor(n: number, m: number, k: number) {
    this.phaseChanged = false
    this.m = m
    this.im = 0
    this.phase = 0
    this.extraVisit = 0
    this.n = n
    this.k = k
    this.finished = false

    if ( this.k >= 2) {
      while ( this.m >  this.k) {
        this.m /= 2;
      }
    } else {
      throw new Error("k < 2 needs to be handled");
    }

    this.extraVisitsPerPhase = extraPhaseVisitsToUpdateQPerPhase( this.n,  this.m)

  }

  next() {
    if (this.finished && this.m == 1) return

    if (this.phase == this.extraVisitsPerPhase.length - 1
      && this.extraVisit == this.extraVisitsPerPhase[this.extraVisitsPerPhase.length - 1] - 1
      && this.im == this.m - 1) {
      this.finished = true;
    }
    this.phaseChanged = false;


    if (this.im < this.m - 1) {
      this.im++;
      this.onFinishedM2One();
      return;
    } else {
      this.im = 0;
    }
    if (this.extraVisit < this.extraVisitsPerPhase[this.phase] - 1) {
      this.extraVisit++;
      this.onFinishedM2One();
      return;
    } else {
      this.extraVisit = 0;
    }
    if (this.phase < this.extraVisitsPerPhase.length - 1) {
      this.phase++;
      this.phaseChanged = true;
      this.m /= 2;
      this.onFinishedM2One();
      return;
    }
    this.onFinishedM2One();
  }


  onFinishedM2One() {
    if (this.finished) {
      this.m = 1;
    }
  }

}
