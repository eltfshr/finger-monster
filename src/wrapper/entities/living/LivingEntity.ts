import { Entity } from '@/wrapper/entities/Entity';

export interface LivingEntity extends Entity {
  
  idle(): void;

  move(): void;

  updatePosition(): void;

  attack(): void;

  hurt(): void;

  die(): void;

}
