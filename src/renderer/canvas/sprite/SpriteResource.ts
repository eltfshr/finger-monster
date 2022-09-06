import { GameResource } from '@/renderer/GameResource';

export abstract class SpriteResource implements GameResource {

  private readonly image: HTMLImageElement;
  private readonly maxFrame: number;

  private spriteWidth: number = 0;
  private spriteHeight: number = 0;
  private frame: number = 0;

  public constructor(imagePath: string, maxFrame: number) {
    this.image = new Image();
    this.image.src = imagePath;
    this.maxFrame = maxFrame;
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
    this.spriteWidth = this.image.width / (this.maxFrame + 1);
    this.spriteHeight = this.image.height;
  }

  public getImage(): HTMLImageElement {
    return this.image;
  }

  public getSpriteWidth(): number {
    return this.spriteWidth;
  }

  public getSpriteHeight(): number {
    return this.spriteHeight;
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

}
