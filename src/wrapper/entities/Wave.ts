export class Wave {

  private readonly minFrequency: number;
  private readonly maxFrequency: number;
  private readonly frameAmount: number;

  constructor(minFrequency: number, maxFrequency: number, frameAmount: number) {
    this.minFrequency = minFrequency;
    this.maxFrequency = maxFrequency;
    this.frameAmount = frameAmount;
  }

  public getMinFrequency(): number {
    return this.minFrequency;
  }

  public getMaxFrequency(): number {
    return this.maxFrequency;
  }

  public getFrameAmount(): number {
    return this.frameAmount;
  }

}