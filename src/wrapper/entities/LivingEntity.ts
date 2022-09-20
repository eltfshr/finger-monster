import { Entity } from '@/wrapper/entities/Entity';

export interface LivingEntity extends Entity {

  getHealth(): number;

  setHealth(health: number): void;

  isIdle(): boolean;

  isMoving(): boolean;

  isAttacking(): boolean;

  isHurting(): boolean;

  isDieing(): boolean;

  idle(): void;

  move(): void;

  attack(): void

  hurt(): void;
  
  die(): void;

}
