import { Entity } from '@/wrapper/entities/Entity';

export interface LivingEntity extends Entity {

  getHealth(): number;

  setHealth(health: number): void;

  idle(): void;

  attack(): void

  hurt(): void;
  
  die(): void;

}
