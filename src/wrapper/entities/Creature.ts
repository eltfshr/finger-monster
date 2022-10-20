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

  public setAnimation(animation: EntityAnimation): void {
    this.animation = animation;
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

  public getScale(): number {
    return this.scale;
  }

  public setScale(scale: number): void {
    this.scale = scale;
  }

  public getVelocity(): number {
    return this.velocity;
  }

  public setVelocity(velocity: number): void {
    this.velocity = velocity;
  }

  public getCurrentState(): EntityState {
    return this.state;
  }

  public setCurrentState(state: EntityState): void {
    if (!this.animation) throw new Error(`${this.constructor.name} doesn't have an animation`);

    this.state = state;
    this.animation.setCurrentSprite(state);
  }

  public setCurrentTemporaryState(state: EntityState, afterState: EntityState): void {
    if (!this.animation) throw new Error(`${this.constructor.name} doesn't have an animation`);

    this.state = state;
    this.animation.setCurrentSprite(state, () => {
      this.setCurrentState(afterState);
    });
  }

  public isOnGround(): boolean {
    return this.onGround;
  }

  public setOnGround(groundY: number): void {
    this.onGround = true;
    this.setY(groundY - (this.getCollision().getTop() + this.getCollision().getHeight()) * this.getScale());
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

  public setHealth(health: number): void {
    this.health = health;
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
