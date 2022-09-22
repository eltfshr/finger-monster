import { ImageRegistry } from '@/renderer/ImageRegistry';

export class SpriteResource {

  private readonly imagePath: string;
  private readonly maxFrame: number;

  private image: HTMLImageElement | undefined;
  private width: number = 0;
  private height: number = 0;
  private frame: number = 0;
  private frameHold: number = 0;
  private needStopLastFrame: boolean = false;
  private endLoopCallback: Function = () => {};

  public constructor(imagePath: string, maxFrame: number, frameHold: number) {
    this.imagePath = imagePath;
    this.maxFrame = maxFrame;
    this.frameHold = frameHold;
  }

  public loadFromImageRegistry(imageRegistry: ImageRegistry): void {
    this.image = imageRegistry.getImage(this.imagePath);
    this.width = this.image.width / (this.maxFrame + 1);
    this.height = this.image.height;
  }

  public getImage(): HTMLImageElement {
    if (!this.image) {
      throw new Error(`Could not get image (${this.imagePath}) from the Image registry`);
    }
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
