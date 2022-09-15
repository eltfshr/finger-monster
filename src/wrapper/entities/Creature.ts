import { EntitySprites } from '@/renderer/canvas/sprite/entities/EntitySprites';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState, LivingEntity } from '@/wrapper/entities/Entity';

export abstract class Creature implements LivingEntity {

  protected readonly sprites: EntitySprites;

  protected x: number;
  protected y: number;
  protected velocity: number = 1.0;
  protected health: number = 100;
  protected state: EntityState = EntityState.IDLE;

  public constructor(sprites: EntitySprites, x: number, y: number) {
    this.sprites = sprites;
    this.x = x;
    this.y = y;
  }

  public async load(): Promise<void> {
    await this.sprites.loadAllSprites();
  }

  public getX(): number {
    return this.x;
  }

  public setX(x: number): void {
    this.x = x;
  }

  public getY(): number {
    return this.y;
  }

  public setY(y: number): void {
    this.y = y;
  }

  public getVelocity(): number {
    return this.velocity;
  }

  public setVelocity(velocity: number): void {
    this.velocity = velocity;
  }

  public getCurrentState(): EntityState {
    throw new Error('Method not implemented.');
  }

  public setCurrentState(state: EntityState): void {
    this.state = state;
    this.sprites.setCurrentSprite(state);
  }

  public getCurrentSprite(): SpriteResource {
    return this.sprites.getCurrentSprite();
  }

  public getHealth(): number {
    throw new Error('Method not implemented.');
  }

  public setHealth(health: number): void {
    this.health = health;
  }

  public abstract attack(): void;

  public abstract damage(): void;

}
