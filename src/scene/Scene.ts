import { GameScreen } from '@/renderer/GameScreen';
import { SpriteDirection } from '@/renderer/sprite/SpriteDirection';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { Entity } from '@/wrapper/entities/Entity';

export abstract class Scene {
  
  private static readonly DEBUG_MODE: boolean = false;

  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly invertedCanvas: HTMLCanvasElement = document.createElement('canvas');
  private readonly invertedContext: CanvasRenderingContext2D = this.invertedCanvas.getContext('2d', { willReadFrequently: true })!;

  protected sceneFrame: number = 0;

  private fpsInterval: number = 0;
  private startTimestamp: number = 0;
  private lastUpdateTimestamp: number = 0;
  private elapsedTime: number = 0;

  public constructor(gameScreen: GameScreen) {
    this.canvas = document.querySelector<HTMLCanvasElement>('#scene')!;
    this.canvas.width = gameScreen.getWidth();
    this.canvas.height = gameScreen.getHeight();
    this.context = this.canvas.getContext('2d')!;
  }

  public drawEntity(entity: Entity, direction: SpriteDirection): void {
    this.drawSprite(entity.getCurrentSprite(), entity.getX(), entity.getY(), direction, entity.getScale());
  }

  public drawSprite(sprite: SpriteResource, x: number, y: number, direction: SpriteDirection, scale: number = 1.0): void {
    const spriteWidth = sprite.getWidth();
    const spriteHeight = sprite.getHeight();
    const collision = sprite.getCollision();
    const flip = direction * sprite.getDirection() < 0;

    if (flip) {
      this.invertedCanvas.width = spriteWidth * (sprite.getMaxFrame() + 1);
      this.invertedContext.scale(-1, 1);
      this.invertedContext.drawImage(sprite.getImage(), -spriteWidth * (sprite.getMaxFrame() + 1), 0);
    }
    
    this.context.drawImage(
      flip ? this.invertedCanvas : sprite.getImage(),
      flip ? spriteWidth * (sprite.getMaxFrame() - sprite.getCurrentFrame()) : sprite.getCurrentFrame() * spriteWidth,
      0,
      spriteWidth,
      spriteHeight,
      x,
      y,
      spriteWidth * scale,
      spriteHeight * scale,
    );

    // Debug sprite bouding box
    Scene.DEBUG_MODE && this.context.strokeRect(x + collision.getLeft() * scale, y + collision.getTop() * scale, collision.getWidth() * scale, collision.getHeight() * scale);
    Scene.DEBUG_MODE && this.context.strokeRect(x, y, sprite.getWidth() * scale, sprite.getHeight() * scale);

    if (this.sceneFrame % sprite.getFrameHold() === 0) {
      sprite.nextFrame();
    }
  }

  public clearScene(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public startScene(fps: number): void {
    this.fpsInterval = 1000 / fps;
    this.lastUpdateTimestamp = Date.now();
    this.startTimestamp = this.lastUpdateTimestamp;
    this.loopScene();
  };

  private loopScene() {
    requestAnimationFrame(this.loopScene.bind(this));

    const nowTimestamp = Date.now();
    this.elapsedTime = nowTimestamp - this.lastUpdateTimestamp;

    if (this.elapsedTime > this.fpsInterval) {
      this.lastUpdateTimestamp = nowTimestamp - (this.elapsedTime % this.fpsInterval);

      this.clearScene();
      this.update();
      this.sceneFrame++;
      
      // Debug FPS
      if (Scene.DEBUG_MODE) {
        const sinceStartTimestamp = nowTimestamp - this.startTimestamp;
        const fps = Math.round((1000 / (sinceStartTimestamp / this.sceneFrame) * 100) / 100);
        this.context.fillStyle = 'white';
        this.context.fillRect(this.getWidth() - 10 - 60, 10, 60, 30);
        this.context.font = '16px Tahoma';
        this.context.fillStyle = 'black';
        this.context.fillText(`FPS ${fps}`, this.getWidth() - 10 - 60 + 5, 31);
      }
    }
  }

  public getWidth(): number {
    return this.canvas.width;
  }

  public getHeight(): number {
    return this.canvas.height;
  }

  public getCanvasContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public abstract load(): Promise<void>;

  public abstract update(): void;

}
