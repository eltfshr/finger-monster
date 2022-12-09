import { EntityAnimation } from '@/renderer/sprite/EntityAnimation';
import { SpriteDirection } from '@/renderer/sprite/SpriteDirection';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class GoblinAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.IDLE,    new SpriteResource('character/goblin/idle.png',    3, 10).setDirection(SpriteDirection.RIGHT)],
      [EntityState.MOVE,    new SpriteResource('character/goblin/move.png',    7, 10).setDirection(SpriteDirection.RIGHT)],
      [EntityState.ATTACK,  new SpriteResource('character/goblin/attack.png',  7, 10).setDirection(SpriteDirection.RIGHT).setMetaData('attack-frame', 6)],
      [EntityState.HURT,    new SpriteResource('character/goblin/hurt.png',    3, 10).setDirection(SpriteDirection.RIGHT)],
      [EntityState.DIE,     new SpriteResource('character/goblin/death.png',   3, 10).setDirection(SpriteDirection.RIGHT)],
    ]);
  }

}
