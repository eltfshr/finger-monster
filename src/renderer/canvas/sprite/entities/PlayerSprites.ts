import { EntityState } from "@/wrapper/Entity";
import { EntitySprite } from "./EntitySprites";
import { SpriteResource } from "../SpriteResource";

export class PlayerSprites implements EntitySprite {

  private readonly spriteResourceByState: Map<EntityState, SpriteResource> = new Map([
    [EntityState.IDLE,    new SpriteResource('character/player/idle.png',   5)],
    [EntityState.ATTACK,  new SpriteResource('character/player/attack.png', 7)],
    [EntityState.HURT,    new SpriteResource('character/player/hurt.png',   3)],
  ]);

  private currentSprite: SpriteResource = this.spriteResourceByState.get(EntityState.IDLE)!;

  public async load(): Promise<void> {
    try {
      const loader = Array
        .from(this.spriteResourceByState.values())
        .map((resource) => resource.load());
      await Promise.all(loader);
    } catch (error: unknown) {
      if (!(error instanceof Error)) return;
      console.log('Something went wrong on loading player sprite resources', error.message);
    }
  }

  public getCurrentSprite(): SpriteResource {
    return this.currentSprite;
  }

  public setCurrentSprite(state: EntityState): void {
    const sprite = this.spriteResourceByState.get(state);
    if (!sprite) return;
    this.currentSprite = sprite;
  }

}
