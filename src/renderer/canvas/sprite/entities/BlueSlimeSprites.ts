import { EntityState } from "@/wrapper/Entity";
import { EntitySprite } from "./EntitySprites";
import { SpriteResource } from "../SpriteResource";

export class BlueSlimeSprites implements EntitySprite {

  private readonly spriteResourceByState: Map<EntityState, SpriteResource> = new Map([
    [EntityState.ATTACK,  new SpriteResource('character/blueslime/attack.png', 5)],
    [EntityState.HURT,    new SpriteResource('character/blueslime/hurt.png',   4)],
    [EntityState.DIE,     new SpriteResource('character/blueslime/idle.png',   4)],
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
      console.log('Something went wrong on loading blue slime sprite resources', error.message);
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
