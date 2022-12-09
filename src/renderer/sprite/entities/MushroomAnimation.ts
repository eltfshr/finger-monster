import { EntityAnimation } from '@/renderer/sprite/EntityAnimation';
import { SpriteDirection } from '@/renderer/sprite/SpriteDirection';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class MushroomAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.IDLE,    new SpriteResource('character/mushroom/idle.png',    3, 10).setDirection(SpriteDirection.RIGHT)],
      [EntityState.MOVE,    new SpriteResource('character/mushroom/move.png',    7, 10).setDirection(SpriteDirection.RIGHT)],
      [EntityState.ATTACK,  new SpriteResource('character/mushroom/attack.png',  7, 10).setDirection(SpriteDirection.RIGHT).setMetaData('attack-frame', 6)],
      [EntityState.HURT,    new SpriteResource('character/mushroom/hurt.png',    3, 10).setDirection(SpriteDirection.RIGHT)],
      [EntityState.DIE,     new SpriteResource('character/mushroom/death.png',   3, 10).setDirection(SpriteDirection.RIGHT)],
    ]);
  }

}
