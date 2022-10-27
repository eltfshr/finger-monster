import { Collision } from '@/renderer/collision/Collision';
import { Ground } from '@/renderer/object/Ground';
import { EntityAnimation } from '@/renderer/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { Entity } from '@/wrapper/entities/Entity';
import { EntityState } from '@/wrapper/entities/EntityState';

export class Projectile implements Entity {

  protected animation: EntityAnimation | null = null;
  protected x: number = 0;
  protected y: number = 0;
  protected xVelocity: number = 1.0;
  protected yVelocity: number = 0;
  protected scale: number = 1;
  protected onGround: boolean = false;
  protected state: EntityState = EntityState.MOVE;

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

  public getXVelocity(): number {
    return this.xVelocity;
  }

  public setXVelocity(velocity: number): Entity {
    this.xVelocity = velocity;
    return this;
  }

  public getYVelocity(): number {
    return this.yVelocity;
  }

  public setYVelocity(velocity: number): Entity {
    this.yVelocity = velocity;
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

}
