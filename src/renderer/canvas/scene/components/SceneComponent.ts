import { GameResource } from '@/renderer/GameResource';

export abstract class SceneComponent<T extends GameResource> {

  private resources: T[];
  private x: number;
  private y: number;

  public constructor(resources: T[], x: number, y: number) {
    this.resources = resources;
    this.x = x;
    this.y = y;
  }

  public getResources(): T[] {
    return this.resources;
  }

  public getX(): number {
    return this.x;
  }

  public setX(x: number): void {
    this.x = x;
  }

  public getY(): number {
    return this.y;
  }

  public setY(y: number): void {
    this.y = y;
  }

}
