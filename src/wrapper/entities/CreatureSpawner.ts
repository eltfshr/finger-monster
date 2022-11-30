import { CollisionRegistry } from '@/renderer/collision/CollisionRegistry';
import { ImageRegistry } from '@/renderer/ImageRegistry';
import { Ground } from '@/renderer/object/Ground';
import { MushroomAnimation } from '@/renderer/sprite/entities/MushroomAnimation';
import { Scene } from '@/scene/Scene';
import { Creature, CreatureConstructor } from '@/wrapper/entities/Creature';

export class CreatureSpawner {
  
  private readonly imageRegistry: ImageRegistry;
  private readonly collisionRegistry: CollisionRegistry;

  private sceneHeight: number = 0;
  private offsetX: number = 0;
  private creatures: Creature[] = [];

  public constructor(imageRegistry: ImageRegistry, collisionRegistry: CollisionRegistry) {
    this.imageRegistry = imageRegistry;
    this.collisionRegistry = collisionRegistry;
  }

  public setScene(scene: Scene): CreatureSpawner {
    this.offsetX = scene.getWidth();
    this.sceneHeight = scene.getHeight();
    return this;
  }

  public spawn(creatureClass: CreatureConstructor, ground: Ground, scale: number): Creature {
    const creature = new creatureClass();
    creature.setScale(scale);
    creature.setAnimation(new MushroomAnimation(this.imageRegistry, this.collisionRegistry));
    creature.setX(this.offsetX);
    creature.setYOnGround(ground);
    creature.attack();
    this.creatures.push(creature);
    return creature;
  }

  public getSpawnedCreatures(): Creature[] {
    return this.creatures;
  }

}
