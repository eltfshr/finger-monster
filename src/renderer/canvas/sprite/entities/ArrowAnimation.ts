import { EntityAnimation } from '@/renderer/canvas/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class ArrowAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.MOVE,  new SpriteResource('character/player/arrow.png',  0, 10)],
    ]);
  }

}
