import { BlueSlimeSprites } from '@/renderer/canvas/sprite/entities/BlueSlimeSprites';
import { Creature } from '@/wrapper/entities/Creature';
import { EntityState } from '@/wrapper/entities/Entity';

export class BlueSlime extends Creature {

  public constructor(x: number, y: number) {
    super(new BlueSlimeSprites(), x, y);
  }

  public idle(): void {
    this.setCurrentState(EntityState.IDLE);
  }

  public attack(): void {
    this.setCurrentState(EntityState.ATTACK);
  }

  public damage(): void {
    this.setCurrentState(EntityState.HURT);
  }

  public hurt(): void {
    this.setCurrentState(EntityState.HURT);
  }

  public die(): void {
    this.setCurrentState(EntityState.DIE);
  }
  
}
