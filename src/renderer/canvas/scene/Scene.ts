import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { Entity } from '@/wrapper/Entity';

export abstract class Scene {
  
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  protected sceneFrame: number = 0;

  public constructor(width: number, height: number) {
    this.canvas = document.querySelector<HTMLCanvasElement>('#scene')!;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext('2d')!;
  }

  public drawEntity(entity: Entity, scale: number = 1): void {
    this.drawSprite(entity.getCurrentSprite(), entity.getX(), entity.getY(), scale);
  }

  public drawSprite(sprite: SpriteResource, x: number, y: number, scale: number = 1): void {
    const spriteWidth = sprite.getWidth();
    const spriteHeight = sprite.getHeight();

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

    this.context.strokeRect(x, y, spriteWidth * scale, spriteHeight * scale); // Debug sprite bouding box

    if (this.sceneFrame % sprite.getFrameHold() === 0) {
      sprite.nextFrame();
    }
  }

  public clearScene(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  public startScene(): void {
    this.clearScene();
    this.action();
    this.sceneFrame++;
    requestAnimationFrame(this.startScene.bind(this));
  };

  public getWidth(): number {
    return this.canvas.width;
  }

  public getHeight(): number {
    return this.canvas.height;
  }

  public abstract load(): Promise<void>;

  public abstract action(): void;

}
