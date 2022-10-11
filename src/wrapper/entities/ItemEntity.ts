import { Entity } from '@/wrapper/entities/Entity';

export interface ItemEntity extends Entity {

  idle(): void;

  collect() : void;

  effect() : void;
  
  expire(): void;

}