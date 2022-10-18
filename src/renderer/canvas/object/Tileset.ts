import { ImageRegistry } from '@/renderer/ImageRegistry';
import { ImageResource } from '@/renderer/ImageResource';

export class Tileset implements ImageResource {

  private readonly imageRegistry: ImageRegistry;

  private image: HTMLImageElement | undefined;
  private size: number = 0;

  public constructor(imageRegistry: ImageRegistry) {
    this.imageRegistry = imageRegistry;
  }

  public setImage(path: string): Tileset {
    this.image = this.imageRegistry.getImage(path);
    return this;
  }

  public draw(
    canvas: CanvasRenderingContext2D,
    x: number,
    y: number,
    tile: [number, number],
    scale: number = 1,
  ): void {
    if (!this.image) throw new Error('Could not draw tile set without image resource');

    canvas.drawImage(
      this.image,
      tile[0] * this.size,
      tile[1] * this.size,
      this.size,
      this.size,
      x,
      y,
      this.size * scale,
      this.size * scale,
    );
  }

  public getSize(): number {
    return this.size;
  }

  public setSize(size: number): Tileset {
    this.size = size;
    return this;
  }
  
}
