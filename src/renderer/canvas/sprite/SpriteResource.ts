import { GameResource } from '@/renderer/GameResource';

export class SpriteResource implements GameResource {

  private readonly image: HTMLImageElement;
  private readonly maxFrame: number;
  private readonly frameHold: number;

  private width: number = 0;
  private height: number = 0;
  private frame: number = 0;

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
    if (this.getCurrentFrame() < this.getMaxFrame()) {
      this.frame += 1;
    } else {
      this.frame = 0;
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

}
