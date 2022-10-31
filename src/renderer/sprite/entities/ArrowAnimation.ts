import { EntityAnimation } from '@/renderer/sprite/EntityAnimation';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/EntityState';

export class ArrowAnimation extends EntityAnimation {

  public createSpriteMap(): Map<EntityState, SpriteResource> {
    return new Map([
      [EntityState.MOVE,  new SpriteResource('character/player/arrow.png',  0, 10)],
    ]);
  }

}
