import { Entity } from '@/wrapper/entities/Entity';
import { Projectile } from '@/wrapper/entities/Projectile';

export interface LivingEntity extends Entity {
  
  idle(): void;

  move(): void;

  updatePosition(): void;

  attack(): void | Projectile;

  hurt(): void;

  die(): void;

}
