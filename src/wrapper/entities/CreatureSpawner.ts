import { BlueSlimeAnimation } from '@/renderer/canvas/sprite/entities/BlueSlimeAnimation';
import { CollisionRegistry } from '@/renderer/collision/CollisionRegistry';
import { ImageRegistry } from '@/renderer/ImageRegistry';
import { Scene } from '@/scene/Scene';
import { Creature } from '@/wrapper/entities/Creature';
import { BlueSlime } from '@/wrapper/entities/living/BlueSlime';

export class CreatureSpawner {
  
  private readonly imageRegistry: ImageRegistry;
  private readonly collisionRegistry: CollisionRegistry;

  private height: number = 0;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private creatures: Creature[] = [];

  public constructor(imageRegistry: ImageRegistry, collisionRegistry: CollisionRegistry) {
    this.imageRegistry = imageRegistry;
    this.collisionRegistry = collisionRegistry;
  }

  public setScene(scene: Scene): CreatureSpawner {
    this.offsetX = scene.getWidth();
    return this;
  }

  public apply(height: number, offsetY: number): CreatureSpawner {
    this.height = height;
    this.offsetY = offsetY;
    return this;
  }

  public spawn(): void {
    const maxY = this.offsetY + this.height;
    const minY = this.offsetY;
    const y = Math.floor(Math.random() * (maxY - minY + 1) + minY);

    const creature = new BlueSlime();
    creature.setAnimation(new BlueSlimeAnimation(this.imageRegistry, this.collisionRegistry));
    creature.setX(this.offsetX);
    creature.setY(520);

    this.creatures.push(creature);
  }

  public getSpawnedCreatures(): Creature[] {
    return this.creatures;
  }

}
