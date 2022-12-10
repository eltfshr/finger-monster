import { Action } from '@/action/Action';
import { Emitter } from '@/emitter/Emitter';
import { FingerIndex } from '@/emitter/handsings/finger/FingerIndex';
import { FingerMiddle } from '@/emitter/handsings/finger/FingerMiddle';
import { FingerPinky } from '@/emitter/handsings/finger/FingerPinky';
import { FingerRing } from '@/emitter/handsings/finger/FIngerRing';
import { FingerThumb } from '@/emitter/handsings/finger/FingerThumb';
import { HandGesture } from '@/emitter/handsings/HandGesture';
import { Time } from '@/utils/time';
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import * as fp from "fingerpose";
import { FingerCurl, FingerDirection } from 'fingerpose';

console.log('dataset:', tf.version['tfjs-data'])
export class CameraEmitter implements Emitter<string> {

  private video?: HTMLVideoElement;
  private network?: handpose.HandPose;
  private gestureEstimator: fp.GestureEstimator = new fp.GestureEstimator([
    new HandGesture('a')
      .loadFinger([
        new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerIndex(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
      ])
      .getHandGesture()!,
    new HandGesture('b')
      .loadFinger([
        new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
        new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerMiddle(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
      ])
      .getHandGesture()!,
    new HandGesture('c')
      .loadFinger([
        new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerMiddle(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerRing(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerPinky(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
      ])
      .getHandGesture()!,
    new HandGesture('d')
      .loadFinger([
        new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
      ])
      .getHandGesture()!,

    // new HandGesture('e')
    //   .loadFinger([
    //     new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerIndex(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //   ])
    //   .getHandGesture()!,

    new HandGesture('f')
      .loadFinger([
        new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerIndex(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerMiddle(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
      ])
      .getHandGesture()!,

    // new HandGesture('g')
    //   .loadFinger([
    //     new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
    //     new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
    //     new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
    //     new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
    //     new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
    //   ])
    //   .getHandGesture()!,

    new HandGesture('h')
      .loadFinger([
        new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
        new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
        new FingerMiddle(FingerCurl.NoCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
      ])
      .getHandGesture()!,

    new HandGesture('i')
      .loadFinger([
        new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
        new FingerIndex(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
      ])
      .getHandGesture()!,

    // new HandGesture('j')
    //   .loadFinger([
    //     new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
    //     new FingerIndex(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
    //     new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
    //     new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
    //     new FingerPinky(FingerCurl.NoCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
    //   ])
    //   .getHandGesture()!,

    new HandGesture('k')
      .loadFinger([
        new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
        new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerMiddle(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
      ])
      .getHandGesture()!,

    new HandGesture('l')
      .loadFinger([
        new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
      ])
      .getHandGesture()!,

    // new HandGesture('m')
    //   .loadFinger([
    //     new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
    //     new FingerIndex(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
    //     new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //   ])
    //   .getHandGesture()!,

    // new HandGesture('n')
    //   .loadFinger([
    //     new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
    //     new FingerIndex(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
    //     new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
    //   ])
    //   .getHandGesture()!,

    new HandGesture('o')
      .loadFinger([
        new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerIndex(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerMiddle(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
      ])
      .getHandGesture()!,

    // new HandGesture('p')
    //   .loadFinger([
    //     new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
    //     new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
    //     new FingerMiddle(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalDownRight, 0.70),
    //     new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalDownRight, 0.70),
    //     new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalDownRight, 0.70),
    //   ])
    //   .getHandGesture()!,

    new HandGesture('q')
      .loadFinger([
        new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalDownRight, 0.70),
        new FingerIndex(FingerCurl.HalfCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
        new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.HorizontalRight, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalDownRight, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalDownRight, 0.70),
      ])
      .getHandGesture()!,

    // new HandGesture('r')
    //   .loadFinger([
    //     new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
    //     new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerMiddle(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //   ])
    //   .getHandGesture()!,

    new HandGesture('s')
      .loadFinger([
        new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerIndex(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
      ])
      .getHandGesture()!,

    new HandGesture('t')
      .loadFinger([
        new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerIndex(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
      ])
      .getHandGesture()!,

    new HandGesture('u')
      .loadFinger([
        new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
        new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerMiddle(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
      ])
      .getHandGesture()!,


    new HandGesture('v')
      .loadFinger([
        new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
        new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerMiddle(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
      ])
      .getHandGesture()!,

    new HandGesture('w')
      .loadFinger([
        new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
        new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerMiddle(FingerCurl.NoCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
        new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
      ])
      .getHandGesture()!,

    // new HandGesture('x')
    //   .loadFinger([
    //     new FingerThumb(FingerCurl.HalfCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerIndex(FingerCurl.HalfCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //     new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
    //   ])
    //   .getHandGesture()!,

    new HandGesture('y')
      .loadFinger([
        new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpRight, 0.70),
        new FingerIndex(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.VerticalUp, 0.70),
        new FingerPinky(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
      ])
      .getHandGesture()!,

    // new HandGesture('z')
    //   .loadFinger([
    //     new FingerThumb(FingerCurl.NoCurl, 1.0, FingerDirection.HorizontalLeft, 0.70),
    //     new FingerIndex(FingerCurl.NoCurl, 1.0, FingerDirection.DiagonalUpLeft, 0.70),
    //     new FingerMiddle(FingerCurl.FullCurl, 1.0, FingerDirection.HorizontalLeft, 0.70),
    //     new FingerRing(FingerCurl.FullCurl, 1.0, FingerDirection.HorizontalLeft, 0.70),
    //     new FingerPinky(FingerCurl.FullCurl, 1.0, FingerDirection.HorizontalLeft, 0.70),
    //   ])
    //   .getHandGesture()!,

  ]);

  private currentKey: string = '';

  public readonly actionByKey: Map<string, Action<string>> = new Map();

  public constructor() {
  }

  public attach(): void {

  }

  public detach(): void {

  }

  private async initClientVideo() {
    if (!navigator.mediaDevices.getUserMedia) {
      throw new Error('getUserMedia() is not supported by your browser');
    }

    const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })
    const video = document.querySelector<HTMLVideoElement>("#camera-box")!;

    video.srcObject = videoStream;
    this.video = video;
  }

  private async initDetector() {
    let network: handpose.HandPose | undefined;
    try {
      network = await handpose.load();
    } catch (e) {
    }

    if (!network) {
      throw new Error('Handpose model not loaded');
    }

    this.network = network;
  }

  public async init(): Promise<void> {
    await this.initClientVideo();
    await this.initDetector();

    setInterval(() => {
      if (this.network) {
        this.updateCurrentKey(this.network, this.video!);
      }
    }, 200);

    await Time.sleep(5_000);
  }

  private async updateCurrentKey(network: handpose.HandPose, video: HTMLVideoElement): Promise<void> {
    const hand = await network.estimateHands(video);

    if (hand.length > 0) {
      const estimatedGesture = this.gestureEstimator.estimate(hand[0].landmarks, 6.5);
      
      if (estimatedGesture.gestures.length > 0) {
        const mostConfidentGesture = estimatedGesture.gestures.reduce((max, curr) => max.score > curr.score ? max : curr, estimatedGesture.gestures[0]);
        this.currentKey = mostConfidentGesture.name;
      } else {
        this.currentKey = ""
      }
    }
  }

  public getCurrentKey(): string {
    return this.currentKey;
  }

}
