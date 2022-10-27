import { ItemEntityAnimation } from '@/renderer/canvas/sprite/ItemEntityAnimation';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export interface ItemEntity {
 
  setAnimation(animation: ItemEntityAnimation): void;

  getX(): number;

  setX(x: number): void;
  
  getY(): number;

  setY(y: number): void;

  getVelocity(): number;

  setVelocity(velocity: number): void;

  getCurrentState(): EntityState;

  setCurrentState(state: EntityState): void;

  getAnimation(): ItemEntityAnimation;

  getCurrentSprite(): SpriteResource;
  
}