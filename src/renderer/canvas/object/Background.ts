import { GameResource } from '@/renderer/GameResource';
import { Scene } from '@/scene/Scene';

export class Background implements GameResource {

  private readonly image: HTMLImageElement;
  
  private x: number = 0;
  private repeatCount: number = 1;

  public constructor(imagePath: string) {
    this.image = new Image();
    this.image.src = imagePath;
  }

  public async load(): Promise<void> {
    if (this.image.complete) {
      return;
    }

    return new Promise((resolve) => {
      this.image.onload = () => {
        resolve();
      };
    });
  }

  public apply(scene: Scene): void {
    const sceneWidth = scene.getWidth();
    const sceneHeight = scene.getHeight();

    if (this.image.height >= sceneHeight) return;

    const bgRatio = this.image.width / this.image.height;
    this.image.width = bgRatio * sceneHeight;
    this.image.height = sceneHeight;

    if (this.image.width >= sceneWidth) return;

    this.repeatCount = Math.ceil(sceneWidth / this.image.width);
  }

  public draw(context: CanvasRenderingContext2D, offsetY: number = 0): void {
    for (let i = 0; i < this.repeatCount; i++) {
      context.drawImage(
        this.image,
        this.x + (i * this.image.width),
        offsetY,
        this.image.width,
        this.image.height,
      );
    }
    for (let i = 0; i < this.repeatCount; i++) {
      context.drawImage(
        this.image,
        this.x + (i * this.image.width) + (this.repeatCount * this.image.width),
        offsetY,
        this.image.width,
        this.image.height,
      );
    }
  }

  public move(speed: number): void {
    if (this.x <= -(this.repeatCount * this.image.width)) {
      this.x = 0;
    }
    this.x -= speed
  }
  
}
