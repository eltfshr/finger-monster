import { Ground } from '@/renderer/canvas/object/Ground';
import { EntityAnimation } from '@/renderer/canvas/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { Collision } from '@/renderer/collision/Collision';
import { Entity } from '@/wrapper/entities/Entity';
import { EntityState } from '@/wrapper/entities/EntityState';
export abstract class Creature implements Entity {

  protected animation: EntityAnimation | null = null;
  protected x: number = 0;
  protected y: number = 0;
  protected velocity: number = 1.0;
  protected health: number = 100;
  protected scale: number = 1;
  protected onGround: boolean = false;
  protected state: EntityState = EntityState.IDLE;

  public setAnimation(animation: EntityAnimation): Entity {
    this.animation = animation;
    return this;
  }

  public getX(): number {
    return this.x;
  }

  public setX(x: number): Entity {
    this.x = x;
    return this;
  }

  public getY(): number {
    return this.y;
  }

  public setY(y: number): Entity {
    this.y = y;
    return this;
  }

  public setYOnGround(ground: Ground): Entity {
    this.setY(ground.getGroundY() - (this.getCollision().getTop() + this.getCollision().getHeight()) * this.getScale());
    return this;
  }

  public getScale(): number {
    return this.scale;
  }

  public setScale(scale: number): Entity {
    this.scale = scale;
    return this;
  }

  public getVelocity(): number {
    return this.velocity;
  }

  public setVelocity(velocity: number): Entity {
    this.velocity = velocity;
    return this;
  }

  public getCurrentState(): EntityState {
    return this.state;
  }

  public setCurrentState(state: EntityState): Entity {
    if (!this.animation) throw new Error(`${this.constructor.name} doesn't have an animation`);

    this.state = state;
    this.animation.setCurrentSprite(state);
    return this;
  }

  public setCurrentTemporaryState(state: EntityState, afterState: EntityState): Entity {
    if (!this.animation) throw new Error(`${this.constructor.name} doesn't have an animation`);

    this.state = state;
    this.animation.setCurrentSprite(state, () => {
      this.setCurrentState(afterState);
    });
    return this;
  }

  public isOnGround(): boolean {
    return this.onGround;
  }

  public setOnGround(onGround: boolean): Entity {
    this.onGround = onGround;
    return this;
  }

  public getAnimation(): EntityAnimation {
    if (!this.animation) throw new Error(`${this.constructor.name} doesn't have an animation`);

    return this.animation;
  }

  public getCurrentSprite(): SpriteResource {
    if (!this.animation) throw new Error(`${this.constructor.name} doesn't have an animation`);

    return this.animation.getCurrentSprite();
  }

  public getHealth(): number {
    return this.health;
  }

  public setHealth(health: number): Entity {
    this.health = health;
    return this;
  }

  public isIdle(): boolean {
    return this.state === EntityState.IDLE;
  }

  public isMoving(): boolean {
    return this.state === EntityState.MOVE;
  }

  public isAttacking(): boolean {
    return this.state === EntityState.ATTACK;
  }

  public isHurting(): boolean {
    return this.state === EntityState.HURT;
  }

  public isDieing(): boolean {
    return this.state === EntityState.DIE;
  }

  public getCollision(): Collision {
    return this.getAnimation().getCurrentSprite().getCollision();
  }

  public isCollide(target: Entity): boolean {
    return this.getCollision().isCollide(
      this.getX(),
      this.getY(),
      target.getX(),
      target.getY(),
      target.getCollision(),
      this.getScale(),
      target.getScale(),
    );
  }

  public abstract idle(): void;

  public abstract move(): void;

  public abstract updatePosition(): void;

  public abstract attack(): void;

  public abstract hurt(): void;

  public abstract die(): void;

}
