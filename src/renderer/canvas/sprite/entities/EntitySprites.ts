import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { GameResource } from '@/renderer/GameResource';
import { EntityState } from '@/wrapper/Entity';

export interface EntitySprites extends GameResource {

  getCurrentSprite(): SpriteResource;

  setCurrentSprite(state: EntityState): void;

}
