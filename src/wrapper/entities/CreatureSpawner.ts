import { CollisionRegistry } from '@/renderer/collision/CollisionRegistry';
import { ImageRegistry } from '@/renderer/ImageRegistry';
import { Ground } from '@/renderer/object/Ground';
import { SkeletonAnimation } from '@/renderer/sprite/entities/SkeletonAnimation';
import { AnimationConstructor } from '@/renderer/sprite/EntityAnimation';
import { Scene } from '@/scene/Scene';
import { Creature, CreatureConstructor } from '@/wrapper/entities/Creature';
import { Skeleton } from '@/wrapper/entities/living/Skeleton';

export class CreatureSpawner {
  
  private readonly imageRegistry: ImageRegistry;
  private readonly collisionRegistry: CollisionRegistry;
  private readonly creatureMap: Map<CreatureConstructor, AnimationConstructor> = new Map();

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
    this.creatures.push(new Skeleton()
      .setX(this.offsetX * 2)
      .setPlaceHolder(true)
      .setScale(2)
      .setAnimation(new SkeletonAnimation(this.imageRegistry, this.collisionRegistry))
    )
    
    return this;
  }

  public addCreature(creatureClass: CreatureConstructor, animationClass: AnimationConstructor): CreatureSpawner {
    this.creatureMap.set(creatureClass, animationClass);
    return this;
  }

  public randomlySpawn(ground: Ground): Creature {
    const candidateCreatures = [...this.creatureMap.keys()];
    const candidateScales = Math.random() * (3 - 2) + 2;
    const creatureClass = candidateCreatures[Math.floor(Math.random() * candidateCreatures.length)];
    const animationClass = this.creatureMap.get(creatureClass)!;
    const creature = new creatureClass();
    
    creature.setScale(candidateScales);
    creature.setAnimation(new animationClass(this.imageRegistry, this.collisionRegistry));
    creature.setX(this.offsetX + 50 - creature.getCurrentSprite().getCollision().getLeft() * creature.getScale());
    creature.setYOnGround(ground);
    creature.attack();
    this.creatures.push(creature);
    return creature;
  }

  public getSpawnedCreatures(): Creature[] {
    return this.creatures;
  }

  public removeCreature(creature: Creature): void {
    const index = this.creatures.findIndex((c) => c === creature);
    this.creatures.splice(index, 1);
  }

  public clearCreatures(): void {
    this.creatures.splice(1, this.creatures.length);
  }

}
