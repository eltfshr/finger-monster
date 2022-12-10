declare module 'fingerpose' {

  export class GestureDescription {
    constructor(name: string);
    addCurl(finger: Finger, curl: FingerCurl, contrib: number): void;
    addDirection(finger: Finger, direction: FingerDirection, contrib: number): void;
    matchAgainst(detectedCurls: FingerCurl[], detectedDirections: FingerDirection[]): number;
  }

  export class Finger {
    static Thumb: number = 0;
    static Index: number = 1;
    static Middle: number = 2;
    static Ring: number = 3;
    static Pinky: number = 4;
    static all: number[] = [0, 1, 2, 3, 4];
    static getName(finger: number): string | false;
    static getPoints(finger: number): number[] | false;
  }

  export class FingerCurl {
    static NoCurl: number = 0;
    static HalfCurl: number = 1;
    static FullCurl: number = 2;
    static getCurlName(curl: number): string | false;
  }

  export class FingerDirection {
    static VerticalUp: number = 0;
    static VerticalDown: number = 1;
    static HorizontalLeft: number = 2;
    static HorizontalRight: number = 3;
    static DiagonalUpRight: number = 4;
    static DiagonalUpLeft: number = 5;
    static DiagonalDownRight: number = 6;
    static DiagonalDownLeft: number = 7;
    static getDirectionName(direction: number): string | false;
  }

  export class GestureEstimator {
    constructor(knownGestures: GestureDescription[], estimatorOptions?: EstimatorOptions);
    estimate(landmarks: number[][], minScore: number): {
      poseData: any[][],
      gestures: {
        confidence: any; // ?
        name: string,
        score: number,
      }[],
    };
  }

}
