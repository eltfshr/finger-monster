import { Collision } from '@/renderer/collision/Collision';
import { CollisionRegistry } from '@/renderer/collision/CollisionRegistry';
import { ImageRegistry } from '@/renderer/ImageRegistry';
import { SpriteDirection } from '@/renderer/sprite/SpriteDirection';

export class SpriteResource {

  private readonly imagePath: string;
  private readonly maxFrame: number;
  private readonly metaData: Map<string, any> = new Map();

  private collision: Collision | undefined;
  private image: HTMLImageElement | undefined;
  private width: number = 0;
  private height: number = 0;
  private frame: number = 0;
  private frameHold: number = 0;
  private direction: SpriteDirection = SpriteDirection.RIGHT;
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

  public loadFromCollisionRegistry(collisionRegistry: CollisionRegistry): void {
    this.collision = collisionRegistry.getCollision(this);
  }

  public getImage(): HTMLImageElement {
    if (!this.image) {
      throw new Error(`Could not get image (${this.imagePath}) from the Image registry`);
    }
    return this.image;
  }

  public getCollision(): Collision {
    if (!this.collision) {
      throw new Error(`Could not get collision (${this.imagePath}) from the Collision registry`);
    }
    return this.collision;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getImagePath(): string {
    return this.imagePath;
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

  public getDirection(): SpriteDirection {
    return this.direction;
  }

  public setDirection(direction: SpriteDirection): SpriteResource {
    this.direction = direction;
    return this;
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

  public setMetaData(key: string, value: any): SpriteResource {
    this.metaData.set(key, value);
    return this;
  }

  public getMetaData(key: string): any {
    if (!this.metaData.has(key)) {
       throw new Error(`Coud not get metadata by key: ${key}`);
    }

    return this.metaData.get(key);
  }

}
