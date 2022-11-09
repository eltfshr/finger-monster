import { EntityAnimation } from '@/renderer/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class FlyingEyeAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.MOVE,    new SpriteResource('character/flyingeye/move.png',    7, 10)],
      [EntityState.ATTACK,  new SpriteResource('character/flyingeye/attack.png',  7, 10)],
      [EntityState.HURT,    new SpriteResource('character/flyingeye/hurt.png',    3, 10)],
      [EntityState.DIE,     new SpriteResource('character/flyingeye/death.png',   3, 10)],
    ]);
  }

}
