import { Finger } from '@/emitter/handsings/finger/Finger';
import { GestureDescription } from "fingerpose";

export class HandGesture {

  private readonly name: string;
  private fingers: Finger[] = [];

  private gestureDescription?: GestureDescription;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public loadFinger(fingers: Finger[]): this {
    this.fingers.push(...fingers);
    this.gestureDescription = new GestureDescription(this.name)

    fingers.forEach((finger) => {
      this.gestureDescription?.addCurl(finger.getNumber(), finger.getCurl(), finger.getCurlScore());
      this.gestureDescription?.addDirection(finger.getNumber(), finger.getDirection(), finger.getDirectionScore());
    });

    return this;
  }

  public getHandGesture() {
    return this.gestureDescription;
  }

}
