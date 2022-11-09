import { EntityAnimation } from '@/renderer/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class MushroomAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.IDLE,    new SpriteResource('character/mushroom/idle.png',    3, 10)],
      [EntityState.MOVE,    new SpriteResource('character/mushroom/move.png',    7, 10)],
      [EntityState.ATTACK,  new SpriteResource('character/mushroom/attack.png',  7, 10)],
      [EntityState.HURT,    new SpriteResource('character/mushroom/hurt.png',    3, 10)],
      [EntityState.DIE,     new SpriteResource('character/mushroom/death.png',   3, 10)],
    ]);
  }

}
