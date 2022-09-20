import { Scene } from '@/scene/Scene';
import { Creature } from '@/wrapper/entities/Creature';
import { BlueSlime } from '@/wrapper/entities/living/BlueSlime';

export class CreatureSpawner {
  
  private height: number = 0;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private creatures: Creature[] = [];

  public apply(scene: Scene, height: number, offsetY: number): void {
    this.height = height;
    this.offsetX = scene.getWidth();
    this.offsetY = offsetY;
  }

  public spawn(): void {
    const maxY = this.offsetY + this.height;
    const minY = this.offsetY;
    const y = Math.floor(Math.random() * (maxY - minY + 1) + minY);

    const creature = new BlueSlime(this.offsetX, y);
    creature.load();

    this.creatures.push(creature);
  }

  public getSpawnedCreatures(): Creature[] {
    return this.creatures;
  }

}
