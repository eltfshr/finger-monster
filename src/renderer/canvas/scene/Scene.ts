import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';

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

  public drawSprite(sprite: SpriteResource, x: number, y: number, speed: number): void {
    const spriteWidth = sprite.getSpriteWidth();
    const spriteHeight = sprite.getSpriteHeight();

    this.context.drawImage(
      sprite.getImage(),
      sprite.getCurrentFrame() * spriteWidth,
      0,
      spriteWidth,
      spriteHeight,
      x,
      y,
      spriteWidth,
      spriteHeight,
    );

    this.context.strokeRect(x, y, spriteWidth, spriteHeight); // Debug

    if (this.sceneFrame % speed == 0) {
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
