import { EntityAnimation } from '@/renderer/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class GoblinAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.IDLE,    new SpriteResource('character/goblin/idle.png',    3, 10)],
      [EntityState.MOVE,    new SpriteResource('character/goblin/move.png',    7, 10)],
      [EntityState.ATTACK,  new SpriteResource('character/goblin/attack.png',  7, 10)],
      [EntityState.HURT,    new SpriteResource('character/goblin/hurt.png',    3, 10)],
      [EntityState.DIE,     new SpriteResource('character/goblin/death.png',   3, 10)],
    ]);
  }

}
