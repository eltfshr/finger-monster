import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { GameScreen } from '@/renderer/GameScreen';
import { Entity } from '@/wrapper/entities/Entity';

export abstract class Scene {
  
  private static readonly DEBUG_MODE: boolean = true;

  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  protected sceneFrame: number = 0;

  private lastUpdateTimestamp: number = Date.now();
  private elapsedTime: number = 0;

  public constructor(gameScreen: GameScreen) {
    this.canvas = document.querySelector<HTMLCanvasElement>('#scene')!;
    this.canvas.width = gameScreen.getWidth();
    this.canvas.height = gameScreen.getHeight();
    this.context = this.canvas.getContext('2d')!;
  }

  public drawEntity(entity: Entity, scale: number = 1): void {
    this.drawSprite(entity.getCurrentSprite(), entity.getX(), entity.getY(), scale);
  }

  public drawSprite(sprite: SpriteResource, x: number, y: number, scale: number = 1.0): void {
    const spriteWidth = sprite.getWidth();
    const spriteHeight = sprite.getHeight();
    const collision = sprite.getCollision();

    this.context.drawImage(
      sprite.getImage(),
      sprite.getCurrentFrame() * spriteWidth,
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

    if (this.sceneFrame % sprite.getFrameHold() === 0) {
      sprite.nextFrame();
    }
  }

  public clearScene(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public startScene(timestamp: number = Date.now()): void {
    this.clearScene();
    this.update();

    // Debug FPS
    if (Scene.DEBUG_MODE) {
      this.elapsedTime = (timestamp - this.lastUpdateTimestamp) / 1000;
      this.lastUpdateTimestamp = timestamp;
      const fps = Math.round(1 / this.elapsedTime);

      this.context.fillStyle = 'white';
      this.context.fillRect(10, 10, 60, 30);
      this.context.font = '16px Tahoma';
      this.context.fillStyle = 'black';
      this.context.fillText(`FPS ${fps}`, 15, 31);
    }

    this.sceneFrame++;
    requestAnimationFrame(this.startScene.bind(this));
  };

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
