import { SpriteResource } from '@/renderer/canvas/sprite/SpriteResource';
import { CollisionRegistry } from '@/renderer/collision/CollisionRegistry';
import { ImageRegistry } from '@/renderer/ImageRegistry';
import { EntityState } from '@/wrapper/entities/EntityState';

export abstract class EntityAnimation {

  private readonly spriteResourceByState: Map<EntityState, SpriteResource>;
  
  private entityState: EntityState;

  public constructor(imageRegistry: ImageRegistry, collisionRegistry: CollisionRegistry) {
    this.spriteResourceByState = this.createSpriteMap();
    this.entityState = this.spriteResourceByState.keys().next().value;
    this.loadAllSprites(imageRegistry, collisionRegistry);
  }

  private loadAllSprites(imageRegistry: ImageRegistry, collisionRegistry: CollisionRegistry): void {
    try {
      Array
        .from(this.spriteResourceByState.values())
        .map((resource) => resource.loadFromImageRegistry(imageRegistry));

      Array
        .from(this.spriteResourceByState.values())
        .map((resource) => resource.loadFromCollisionRegistry(collisionRegistry));
    } catch (error) {
      throw new Error(`Could not load a resource for ${this.constructor.name}`);
    }
  }

  public getAllSprites(): SpriteResource[] {
    return Array.from(this.spriteResourceByState.values());
  }

  public getCurrentSprite(): SpriteResource {
    const sprite = this.spriteResourceByState.get(this.entityState);
    if (!sprite) throw new Error(`Could not get a resource with state ${this.entityState}`);
    return sprite;
  }

  public setCurrentSprite(state: EntityState, callback?: Function): void {
    let sprite = this.getCurrentSprite();

    // Reset previous sprite state
    sprite.resetFrame();
    sprite.setStopLastFrame(false);

    // Manipulate with a sprite of the new state
    this.entityState = state;
    sprite = this.getCurrentSprite();
    callback && sprite.setEndLoopCallback(callback);
  }

  public abstract createSpriteMap(): Map<EntityState, SpriteResource>;

}
