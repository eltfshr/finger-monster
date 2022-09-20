import { GameResource } from '@/renderer/GameResource';

export class Tileset implements GameResource {

  private readonly image: HTMLImageElement;
  private readonly size: number;

  public constructor(imagePath: string, size: number) {
    this.image = new Image();
    this.image.src = imagePath;
    this.size = size;
  }

  public async load(): Promise<void> {
    if (this.image.complete) return;

    return new Promise((resolve) => {
      this.image.onload = () => {
        resolve();
      };
    });
  }

  public draw(
    canvas: CanvasRenderingContext2D,
    x: number,
    y: number,
    tile: [number, number],
    scale: number = 1,
  ) {
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
  
}
