import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/Entity';

export interface EntitySprites {

  loadAllSprites(): Promise<void>;

  getCurrentSprite(): SpriteResource;

  setCurrentSprite(state: EntityState, callback?: Function): void;

}
