export abstract class Finger {

  public abstract readonly name: string;
  public abstract readonly number: number;

  private readonly curl: number;
  private readonly curlScore: number;
  private readonly direction: number;
  private readonly directionScore: number;

  public constructor(
    curl: number,
    curlScore: number,
    direction: number,
    directionScore: number
  ) {
    this.curl = curl;
    this.curlScore = curlScore;
    this.direction = direction;
    this.directionScore = directionScore;
  }

  public getName() {
    return this.name;
  }

  public getNumber() {
    return this.number;
  }
 
  public getCurl() {
    return this.curl;
  }

  public getCurlScore() {
    return this.curlScore;
  }

  public getDirection() {
    return this.direction;
  }

  public getDirectionScore() {
    return this.directionScore;
  }

}
