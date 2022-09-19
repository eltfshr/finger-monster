import { EntitySprites } from '@/renderer/canvas/sprite/entities/EntitySprites';
import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { EntityState } from '@/wrapper/entities/Entity';

export abstract class AbstractEntitySprites implements EntitySprites {

  private readonly spriteResourceByState: Map<EntityState, SpriteResource>;

  private currentSprite: SpriteResource;

  public constructor(spriteMap: Map<EntityState, SpriteResource>, defaultState: EntityState) {
    this.spriteResourceByState = spriteMap;
    this.currentSprite = this.spriteResourceByState.get(defaultState)!;
  }

  public async loadAllSprites(): Promise<void> {
    const loader = Array
      .from(this.spriteResourceByState.values())
      .map((resource) => resource.load());
    await Promise.all(loader);
  }

  public getCurrentSprite(): SpriteResource {
    return this.currentSprite;
  }

  public setCurrentSprite(state: EntityState, callback?: Function): void {
    const sprite = this.spriteResourceByState.get(state);
    if (!sprite) throw new Error(`Could not load a resource with state ${sprite}`);

    this.currentSprite.resetFrame();
    this.currentSprite = sprite;

    this.currentSprite.setStopLastFrame(false);
    callback && this.currentSprite.setEndLoopCallback(callback);
  }
  
}
