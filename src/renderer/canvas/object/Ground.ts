import { Tileset } from '@/renderer/canvas/object/Tileset';
import { GameResource } from '@/renderer/GameResource';

export class Ground implements GameResource {

  private static readonly PLANT_PECENTAGE = 0.2;

  private readonly tileset = new Tileset('tiles/tileset1.png', 16);

  private width: number = 0;
  private height: number = 0;
  private sceneHeight: number = 0;
  private scale: number = 1;
  private x: number = 0;
  private tileMap: number[][][] = [];

  public async load(): Promise<void> {
    await this.tileset.load();
  }

  public init(): void {
    this.tileMap = this.generate(2);
  }

  public apply(width: number, height: number, sceneHeight: number, scale: number = 1): void {
    this.width = width;
    this.height = height;
    this.sceneHeight = sceneHeight;
    this.scale = scale;
  }

  private generate(chunk: number): number[][][] {
    const resultTileMap: number[][][] = [];
    const tileSize = this.tileset.getSize() * this.scale;
    const tileXCount = Math.ceil(this.width / tileSize) * chunk;
    const tileYCount = Math.ceil(this.height / tileSize);

    for (let i = 0; i < tileYCount; i++) {
      resultTileMap[i] ??= [];
      for (let j = 0; j < tileXCount; j++) {
        if (i === 0) {
          // Overground layer
          const plantChance = (Math.floor(Math.random() * 100) + 1) / 100;
          if (plantChance <= Ground.PLANT_PECENTAGE) {
            const plantTile = Math.floor(Math.random() * (9 - 8 + 1) + 8);
            resultTileMap[i][j] = [plantTile, 2];
          } else {
            resultTileMap[i][j] = [0, 0];
          }
        } else if (i === 1) {
          // Top ground layer
          const groundTile = Math.floor(Math.random() * (9 - 8 + 1) + 8);
          resultTileMap[i][j] = [groundTile, 3];
        } else if (i === 2) {
          // Secondary ground layer
          resultTileMap[i][j] = [resultTileMap[i - 1][j][0], 4];
        } else {
          // Deep ground layer
          resultTileMap[i][j] = [9, 4];
        }
      }
    }

    return resultTileMap;
  }

  public regenerate(): void {
    const tileSize = this.tileset.getSize() * this.scale;
    const tileXCount = Math.ceil(this.width / tileSize);
    const tileYCount = Math.ceil(this.height / tileSize);
    const newTileMap = this.generate(1);

    for (let i = 0; i < tileYCount; i++) {
      this.tileMap[i] = [...this.tileMap[i].slice(tileXCount), ...newTileMap[i]];
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    const tileSize = this.tileset.getSize() * this.scale;
    const tileXCount = Math.ceil(this.width / tileSize) * 2;
    const tileYCount = Math.ceil(this.height / tileSize);
    const yOffset = this.sceneHeight - (tileYCount * tileSize);

    for (let i = 0; i < tileYCount; i++) {
      for (let j = 0; j < tileXCount; j++) {
        this.tileset.draw(
          context,
          (16 * 0) + this.x + (j * tileSize),
          yOffset + (i * tileSize),
          this.tileMap[i][j] as [number, number] || [0, 0],
          this.scale,
        );
      }
    }
  }

  public move(speed: number): void {
    if (this.x <= -this.width) {
      this.x = 0;
      this.regenerate();
    }

    this.x -= speed;
  }

}
