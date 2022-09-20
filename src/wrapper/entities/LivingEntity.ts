import { Entity } from '@/wrapper/entities/Entity';

export interface LivingEntity extends Entity {

  getHealth(): number;

  setHealth(health: number): void;

  idle(): void;

  move(): void;

  attack(): void

  hurt(): void;
  
  die(): void;

}
