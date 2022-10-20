import { EntityAnimation } from '@/renderer/canvas/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { Collision } from '@/renderer/collision/Collision';
import { EntityState } from '@/wrapper/entities/EntityState';
``
export interface Entity {
  
  setAnimation(animation: EntityAnimation): Entity;

  getX(): number;

  setX(x: number): Entity;
  
  getY(): number;

  setY(y: number): Entity;

  getScale(): number;

  setScale(scale: number): Entity;

  getVelocity(): number;

  setVelocity(velocity: number): Entity;

  getCurrentState(): EntityState;

  setCurrentState(state: EntityState): Entity;

  setCurrentTemporaryState(state: EntityState, afterState: EntityState): Entity;

  isOnGround(): boolean;

  setOnGround(groundY: number): void;

  getAnimation(): EntityAnimation;

  getCurrentSprite(): SpriteResource;

  getCollision(): Collision;

  isCollide(target: Entity): boolean;

}
