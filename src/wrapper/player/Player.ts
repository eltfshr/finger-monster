import { PlayerSprites } from '@/renderer/canvas/sprite/entities/PlayerSprites';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { Entity, EntityState } from '@/wrapper/Entity';

export class Player implements Entity {

  private sprites: PlayerSprites = new PlayerSprites();
  private x: number;
  private y: number;
  private health: number = 100;
  private state: EntityState = EntityState.IDLE;

  public constructor(x: number, y: number) {
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

  public getHealth(): number {
    return this.health;
  }

  public setHealth(health: number): void {
    this.health = health;
  }

  public getCurrentState(): EntityState {
    return this.state;
  }

  public setCurrentState(state: EntityState): void {
    this.state = state;
    this.sprites.setCurrentSprite(state);
  }

  public getCurrentSprite(): SpriteResource {
    return this.sprites.getCurrentSprite();
  }

  public attack(target: Entity): void {
    // TODO
    console.log('attack', target);
  }

}

