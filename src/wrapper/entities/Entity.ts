import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';

export interface Entity {

  load(): Promise<void>;
  
  getX(): number;

  setX(x: number): void;
  
  getY(): number;

  setY(y: number): void;

  getVelocity(): number;

  setVelocity(velocity: number): void;

  getCurrentState(): EntityState;

  setCurrentState(state: EntityState): void;

  setCurrentTemporaryState(state: EntityState, afterState: EntityState): void;

  getCurrentSprite(): SpriteResource;

}

export enum EntityState {
  IDLE,
  MOVE,
  ATTACK,
  HURT,
  DIE,
};
