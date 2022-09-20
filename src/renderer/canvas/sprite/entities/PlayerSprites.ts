import { AbstractEntitySprites } from '@/renderer/canvas/sprite/entities/AbstractEntitySprites';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from "@/wrapper/entities/Entity";

export class PlayerSprites extends AbstractEntitySprites {

<<<<<<< HEAD
  private readonly spriteResourceByState: Map<EntityState, SpriteResource> = new Map([
    [EntityState.IDLE,    new SpriteResource('character/player/idle.png',   12, 10)],
    [EntityState.ATTACK,  new SpriteResource('character/player/attack.png', 7, 10)],
    [EntityState.HURT,    new SpriteResource('character/player/hurt.png',   3, 10)],
  ]);
=======
  public constructor() {
    const spriteResourceByState = new Map([
      [EntityState.IDLE,    new SpriteResource('character/player/idle.png',     11, 10)],
      [EntityState.MOVE,    new SpriteResource('character/player/move.png',     8, 10)],
      // [EntityState.ATTACK,  new SpriteResource('character/player/attack.png',   7, 10)],
      [EntityState.HURT,    new SpriteResource('character/player/hurt.png',     5, 10)],
      [EntityState.DIE,     new SpriteResource('character/player/death.png',    18, 10)],
    ]);
>>>>>>> dev

    super(spriteResourceByState, EntityState.IDLE);
  }

}
