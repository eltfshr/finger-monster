import { Tileset } from '@/renderer/canvas/object/Tileset';
import { ImageRegistry } from '@/renderer/ImageRegistry';
import { ImageResource } from '@/renderer/ImageResource';
import { Scene } from '@/scene/Scene';

export class Ground implements ImageResource {

  private static readonly PLANT_PECENTAGE = 0.2;
  private static readonly DEEP_GROUND_CHANCE = 0.3;

  private readonly imageRegistry: ImageRegistry;

  private tileset: Tileset | undefined;
  private width: number = 0;
  private height: number = 0;
  private sceneHeight: number = 0;
  private scale: number = 1;
  private x: number = 0;
  private tileMap: number[][][] = [];

  public constructor(imageRegistry: ImageRegistry) {
    this.imageRegistry = imageRegistry;
  }

  public setImage(path: string): Ground {
    this.tileset = new Tileset(this.imageRegistry);
    this.tileset.setImage(path);
    return this;
  }

  public setSize(size: number): Ground {
    if (!this.tileset) {
      throw new Error('Could not set size without image resource');
    }

    this.tileset.setSize(size);
    return this;
  }

  public setScene(scene: Scene): Ground {
    this.width = scene.getWidth();
    this.sceneHeight = scene.getHeight();
    return this;
  }

  public apply(height: number, scale: number = 1): Ground {
    this.height = height;
    this.scale = scale;
    return this;
  }

  public init(): void {
    this.tileMap = this.generate(2);
  }

  private generate(chunk: number): number[][][] {
    if (!this.tileset) throw new Error('Could not generate ground without image resource');

    console.log(this.tileset.getSize());

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
          const deepGroundChance = (Math.floor(Math.random() * 100) + 1) / 100;
          const groundTile = (deepGroundChance <= Ground.DEEP_GROUND_CHANCE) ? 8 : 9;
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
    if (!this.tileset) throw new Error('Could not regenerate ground without image resource');

    const tileSize = this.tileset.getSize() * this.scale;
    const tileXCount = Math.ceil(this.width / tileSize);
    const tileYCount = Math.ceil(this.height / tileSize);
    const newTileMap = this.generate(1);

    for (let i = 0; i < tileYCount; i++) {
      this.tileMap[i] = [...this.tileMap[i].slice(tileXCount), ...newTileMap[i]];
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (!this.tileset) throw new Error('Could not draw ground without image resource');

    const tileSize = this.tileset.getSize() * this.scale;
    const tileXCount = Math.ceil(this.width / tileSize) * 2;
    const tileYCount = Math.ceil(this.height / tileSize);
    const offsetY = this.sceneHeight - (tileYCount * tileSize);

    for (let i = 0; i < tileYCount; i++) {
      for (let j = 0; j < tileXCount; j++) {
        this.tileset.draw(
          context,
          (16 * 0) + this.x + (j * tileSize),
          offsetY + (i * tileSize),
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
