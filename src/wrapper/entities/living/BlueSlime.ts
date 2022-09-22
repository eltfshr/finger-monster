import { EntityState } from '@/wrapper/entities/EntityState';
import { HostileCreature } from '@/wrapper/entities/HostileCreature';

export class BlueSlime extends HostileCreature {

  public idle(): void {
    this.setCurrentState(EntityState.IDLE);
  }

  public move(): void {
    this.setCurrentState(EntityState.MOVE);
  }

  public updatePosition(): void {

  }

  public attack(): void {
    this.setCurrentState(EntityState.ATTACK);
  }

  public hurt(): void {
    this.setCurrentState(EntityState.HURT);
  }

  public die(): void {
    this.setCurrentState(EntityState.DIE);
  }
  
}
