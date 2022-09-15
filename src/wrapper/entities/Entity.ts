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

  getCurrentSprite(): SpriteResource;

}

export interface LivingEntity extends Entity {

  getHealth(): number;

  setHealth(health: number): void;

  attack(): void

  damage(): void;

}

export enum EntityState {
  IDLE,
  ATTACK,
  HURT,
  DIE,
};
