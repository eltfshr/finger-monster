import { AudioResource } from "@/renderer/audio/AudioResource";
import { Collision } from "@/renderer/collision/Collision";
import { Ground } from "@/renderer/object/Ground";
import { EntityAnimation } from "@/renderer/sprite/EntityAnimation";
import { SpriteResource } from "@/renderer/sprite/SpriteResource";
import { Entity } from "@/wrapper/entities/Entity";
import { EntityState } from "@/wrapper/entities/EntityState";
import { LivingEntity } from "@/wrapper/entities/living/LivingEntity";
import { Projectile } from "@/wrapper/entities/Projectile";

export abstract class Creature implements LivingEntity {
  protected animation: EntityAnimation | null = null;
  protected x: number = 0;
  protected y: number = 0;
  protected xVelocity: number = 1.0;
  protected yVelocity: number = 0;
  protected health: number = 100;
  protected scale: number = 1;
  protected onGround: boolean = false;
  protected placeHolder: boolean = false;
  protected state: EntityState = EntityState.IDLE;
  protected sound: AudioResource | null = null;

  public setAnimation(animation: EntityAnimation): Creature {
    this.animation = animation;
    return this;
  }

  public getX(): number {
    return this.x;
  }

  public setAudio(sound: AudioResource): Creature {
    this.sound = sound;
    return this;
  }

  public playAudio(): void {
    if (this.sound) {
      this.sound.play();
    }
  }

  public setX(x: number): Creature {
    if (!this.isPlaceHolder()) {
      this.x = x;
    }
    return this;
  }

  public getY(): number {
    return this.y;
  }

  public getRealX(): number {
    return this.getX() + this.getCollision().getLeft() * this.getScale();
  }

  public setY(y: number): Creature {
    this.y = y;
    return this;
  }

  public getRealY(): number {
    return this.getY() + this.getCollision().getTop() * this.getScale();
  }

  public setYOnGround(ground: Ground): Creature {
    this.setY(
      ground.getGroundY() -
        (this.getCollision().getTop() + this.getCollision().getHeight()) *
          this.getScale()
    );
    return this;
  }

  public getRealWidth(): number {
    return this.getCollision().getWidth() * this.getScale();
  }

  public getRealHeight(): number {
    return this.getCollision().getHeight() * this.getScale();
  }

  public getScale(): number {
    return this.scale;
  }

  public setScale(scale: number): Creature {
    this.scale = scale;
    return this;
  }

  public getXVelocity(): number {
    return this.xVelocity;
  }

  public setXVelocity(velocity: number): Creature {
    this.xVelocity = velocity;
    return this;
  }

  public getYVelocity(): number {
    return this.yVelocity;
  }

  public setYVelocity(velocity: number): Creature {
    this.yVelocity = velocity;
    return this;
  }

  public getCurrentState(): EntityState {
    return this.state;
  }

  public setCurrentState(state: EntityState): Creature {
    if (!this.animation)
      throw new Error(`${this.constructor.name} doesn't have an animation`);

    this.state = state;
    this.animation.setCurrentSprite(state);
    return this;
  }

  public setCurrentTemporaryState(
    state: EntityState,
    afterState: EntityState
  ): Creature {
    if (!this.animation)
      throw new Error(`${this.constructor.name} doesn't have an animation`);

    this.state = state;
    this.animation.setCurrentSprite(state, () => {
      this.setCurrentState(afterState);
    });
    return this;
  }

  public isOnGround(): boolean {
    return this.onGround;
  }

  public setOnGround(onGround: boolean): Creature {
    this.onGround = onGround;
    return this;
  }

  public isPlaceHolder(): boolean {
    return this.placeHolder;
  }

  public setPlaceHolder(placeHolder: boolean): Creature {
    this.placeHolder = placeHolder;
    return this;
  }

  public getAnimation(): EntityAnimation {
    if (!this.animation)
      throw new Error(`${this.constructor.name} doesn't have an animation`);

    return this.animation;
  }

  public getCurrentSprite(): SpriteResource {
    if (!this.animation)
      throw new Error(`${this.constructor.name} doesn't have an animation`);

    return this.animation.getCurrentSprite();
  }

  public getHealth(): number {
    if (this.isPlaceHolder()) {
      return 1;
    }

    return this.health;
  }

  public setHealth(health: number): Creature {
    if (!this.isPlaceHolder()) {
      this.health = health;
    }

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

  public jump(): void {
    if (this.isOnGround()) {
      this.setYVelocity(-7);
      this.setOnGround(false);
    }
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
      target.getScale()
    );
  }

  public abstract idle(): void;

  public abstract move(): void;

  public abstract updatePosition(): void;

  public abstract attack(): void | Projectile;

  public abstract hurt(): void;

  public abstract die(): void;
}

export type CreatureConstructor<T extends Creature = Creature> = new (
  ...args: any[]
) => T;
