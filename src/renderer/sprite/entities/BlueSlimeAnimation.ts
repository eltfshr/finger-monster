import { EntityAnimation } from '@/renderer/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class BlueSlimeAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.IDLE,    new SpriteResource('character/blueslime/idle.png',    3, 10)],
      [EntityState.MOVE,    new SpriteResource('character/blueslime/move.png',    3, 10)],
      [EntityState.ATTACK,  new SpriteResource('character/blueslime/attack.png',  4, 10)],
      [EntityState.HURT,    new SpriteResource('character/blueslime/hurt.png',    3, 10)],
      [EntityState.DIE,     new SpriteResource('character/blueslime/die.png',     3, 10)],
    ]);
  }

}
