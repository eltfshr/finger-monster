import { EntityAnimation } from '@/renderer/canvas/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class BlueSlimeAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.ATTACK,  new SpriteResource('character/blueslime/attack.png',  4, 10)],
      [EntityState.HURT,    new SpriteResource('character/blueslime/hurt.png',    4, 10)],
      [EntityState.DIE,     new SpriteResource('character/blueslime/die.png',     4, 10)],
    ]);
  }

}
