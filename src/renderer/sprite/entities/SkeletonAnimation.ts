import { EntityAnimation } from '@/renderer/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class SkeletonAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.IDLE,    new SpriteResource('character/skeleton/idle.png',    3, 10)],
      [EntityState.MOVE,    new SpriteResource('character/skeleton/move.png',    3, 10)],
      [EntityState.ATTACK,  new SpriteResource('character/skeleton/attack.png',  7, 10)],
      [EntityState.HURT,    new SpriteResource('character/skeleton/hurt.png',    3, 10)],
      [EntityState.DIE,     new SpriteResource('character/skeleton/death.png',   3, 10)],
    ]);
  }

}
