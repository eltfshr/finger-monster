import { EntityAnimation } from '@/renderer/sprite/EntityAnimation';
import { SpriteDirection } from '@/renderer/sprite/SpriteDirection';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class PlayerAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.IDLE,    new SpriteResource('character/player/idle.png',       11,   10).setDirection(SpriteDirection.RIGHT)],
      [EntityState.MOVE,    new SpriteResource('character/player/move.png',       8,    10).setDirection(SpriteDirection.RIGHT)],
      [EntityState.ATTACK,  new SpriteResource('character/player/attack1.png',    14,   10).setDirection(SpriteDirection.RIGHT).setMetaData('attack-frame', 8)],
      [EntityState.HURT,    new SpriteResource('character/player/hurt.png',       5,    10).setDirection(SpriteDirection.RIGHT)],
      [EntityState.DIE,     new SpriteResource('character/player/death.png',      18,   10).setDirection(SpriteDirection.RIGHT)],
    ]);
  }

}
