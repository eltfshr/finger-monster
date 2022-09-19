import { AbstractEntitySprites } from '@/renderer/canvas/sprite/entities/AbstractEntitySprites';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/Entity';

export class BlueSlimeSprites extends AbstractEntitySprites {

  public constructor() {
    const spriteResourceByState = new Map([
      [EntityState.ATTACK,  new SpriteResource('character/blueslime/attack.png',  4, 10)],
      [EntityState.HURT,    new SpriteResource('character/blueslime/hurt.png',    4, 10)],
      [EntityState.DIE,     new SpriteResource('character/blueslime/die.png',     4, 10)],
    ]);

    super(spriteResourceByState, EntityState.ATTACK);
  }

}
