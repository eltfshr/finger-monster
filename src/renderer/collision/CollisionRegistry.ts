import { Collision } from '@/renderer/collision/Collision';
import { CollisionProcessor } from '@/renderer/collision/CollisionProcessor';
import { SpriteResource } from '@/renderer/sprite/SpriteResource';

export class CollisionRegistry {

  private readonly collisionByPath: Map<string, Collision> = new Map();
  private readonly collisionProcessor = new CollisionProcessor();

  public getCollision(sprite: SpriteResource): Collision {
    if (this.collisionByPath.has(sprite.getImagePath())) {
      return this.collisionByPath.get(sprite.getImagePath())!;
    }

    const collision = this.collisionProcessor.process(sprite);
    this.collisionByPath.set(sprite.getImagePath(), collision);

    return collision;
  }

}
