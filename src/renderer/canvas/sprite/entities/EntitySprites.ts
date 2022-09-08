import { GameResource } from "@/renderer/GameResource";
import { EntityState } from "@/wrapper/Entity";
import { SpriteResource } from "../SpriteResource";

export interface EntitySprite extends GameResource {

  getCurrentSprite(): SpriteResource;

  setCurrentSprite(state: EntityState): void;

}
