import { ImageRegistry } from '@/renderer/ImageRegistry';
import { ImageResource } from '@/renderer/ImageResource';
import { Scene } from '@/scene/Scene';

export class Background implements ImageResource {

  private readonly imageRegistry: ImageRegistry;

  private image: HTMLImageElement | undefined;
  private x: number = 0;
  private repeatCount: number = 1;

  public constructor(imageRegistry: ImageRegistry) {
    this.imageRegistry = imageRegistry;
  }

  public setImage(path: string): Background {
    this.image = this.imageRegistry.getImage(path); 
    return this;
  }

  public setScene(scene: Scene): Background {
    if (!this.image) throw new Error('Could not set scene without image resource');

    const sceneWidth = scene.getWidth();
    const sceneHeight = scene.getHeight();

    if (this.image.height >= sceneHeight) return this;

    const bgRatio = this.image.width / this.image.height;
    this.image.width = bgRatio * sceneHeight;
    this.image.height = sceneHeight;

    if (this.image.width >= sceneWidth) return this;

    this.repeatCount = Math.ceil(sceneWidth / this.image.width);

    return this;
  }

  public draw(context: CanvasRenderingContext2D, offsetY: number = 0): void {
    if (!this.image) throw new Error('Could not set draw without image resource');

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
    if (!this.image) throw new Error('Could not move scene without image resource');

    if (this.x <= -(this.repeatCount * this.image.width)) {
      this.x = 0;
    }
    this.x -= speed
  }
  
}
