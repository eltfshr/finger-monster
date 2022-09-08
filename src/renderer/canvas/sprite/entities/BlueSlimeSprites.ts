import { EntityState } from "@/wrapper/Entity";
import { SpriteResource } from "../SpriteResource";
import { EntitySprite } from "./EntitySprites";

export class BlueSlimeSprites implements EntitySprite {

  private readonly spriteResourceByState: Map<EntityState, SpriteResource> = new Map([
    [EntityState.ATTACK,  new SpriteResource('character/blueslime/attack.png',  5)],
    [EntityState.HURT,    new SpriteResource('character/blueslime/hurt.png',    4)],
    [EntityState.DIE,     new SpriteResource('character/blueslime/die.png',     4)],
  ]);

  private currentSprite: SpriteResource = this.spriteResourceByState.get(EntityState.ATTACK)!;

  public async load(): Promise<void> {
    const loader = Array
      .from(this.spriteResourceByState.values())
      .map((resource) => resource.load());
    await Promise.all(loader);
  }

  public getCurrentSprite(): SpriteResource {
    return this.currentSprite;
  }

  public setCurrentSprite(state: EntityState): void {
    const sprite = this.spriteResourceByState.get(state);
    if (!sprite) throw new Error(`Could not load Blue slime resource with state ${sprite}`);
    this.currentSprite = sprite;
  }

}
