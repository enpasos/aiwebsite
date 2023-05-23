export interface MinMaxStats {
  maximum: number;
  minimum: number;

  update(value: number): void;

  normalize(value: number): number;
}

export class MinMaxStatsBase implements MinMaxStats {

  maximum: number;
  minimum: number;

  constructor(minimum: number, maximum: number) {
    this.minimum = minimum;
    this.maximum = maximum;
  }

  update(value: number): void {
    this.minimum = Math.min(this.minimum, value);
    this.maximum = Math.max(this.maximum, value);
  }

  normalize(value: number): number {
    if (this.maximum > this.minimum) {
      return (value - this.minimum) / (this.maximum - this.minimum);
    }
    return value;
  }

}
