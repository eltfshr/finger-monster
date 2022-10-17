import { EntityAnimation } from '@/renderer/canvas/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { Collision } from '@/renderer/collision/Collision';
import { EntityState } from '@/wrapper/entities/EntityState';
``
export interface Entity {
  
  setAnimation(animation: EntityAnimation): void;

  getX(): number;

  setX(x: number): void;
  
  getY(): number;

  setY(y: number): void;

  getVelocity(): number;

  setVelocity(velocity: number): void;

  getCurrentState(): EntityState;

  setCurrentState(state: EntityState): void;

  setCurrentTemporaryState(state: EntityState, afterState: EntityState): void;

  getAnimation(): EntityAnimation;

  getCurrentSprite(): SpriteResource;

  getCollision(): Collision;

  isCollide(target: Entity, scale: number, targetScale: number): boolean;

}
