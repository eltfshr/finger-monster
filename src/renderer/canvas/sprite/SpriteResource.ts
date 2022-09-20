import { GameResource } from '@/renderer/GameResource';

export class SpriteResource implements GameResource {

  private readonly image: HTMLImageElement;
  private readonly maxFrame: number;

  private width: number = 0;
  private height: number = 0;
  private frame: number = 0;
  private frameHold: number = 0;
  private needStopLastFrame: boolean = false;
  private endLoopCallback: Function = () => {};

  public constructor(imagePath: string, maxFrame: number, frameHold: number) {
    this.image = new Image();
    this.image.src = imagePath;
    this.maxFrame = maxFrame;
    this.frameHold = frameHold;
  }

  public async load(): Promise<void> {
    if (this.image.complete) {
      this.loadSpriteDimension();
      return;
    }

    return new Promise((resolve) => {
      this.image.onload = () => {
        this.loadSpriteDimension();
        resolve();
      };
    });
  }

  private loadSpriteDimension(): void {
    this.width = this.image.width / (this.maxFrame + 1);
    this.height = this.image.height;
  }

  public getImage(): HTMLImageElement {
    return this.image;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public nextFrame(): void {
    const isCompleteLoop = this.getCurrentFrame() === this.getMaxFrame();

    if (isCompleteLoop && this.needStopLastFrame) return;

    if (isCompleteLoop) {
      this.resetFrame();
      this.endLoopCallback();
      this.endLoopCallback = () => {};
    } else {
      this.frame += 1;
    }
  }

  public resetFrame(): void {
    this.frame = 0;
  }

  public getCurrentFrame(): number {
    return this.frame;
  }

  public getMaxFrame(): number {
    return this.maxFrame;
  }

  public getFrameHold(): number {
    return this.frameHold;
  }

  public setFrameHold(frameHold: number): void {
    this.frameHold = frameHold;
  }

  public setStopLastFrame(needStop: boolean): void {
    this.needStopLastFrame = needStop;
  }

  public setEndLoopCallback(callback: Function): void {
    this.endLoopCallback = callback;
  }

}
