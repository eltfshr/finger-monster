import { EntityState } from '@/wrapper/entities/EntityState';
import { HostileCreature } from '@/wrapper/entities/HostileCreature';

export class Mushroom extends HostileCreature {

  protected health: number = 200;
  protected damage: number = 15;

  public idle(): void {
    this.setCurrentState(EntityState.IDLE);
  }

  public move(): void {
    this.setCurrentState(EntityState.MOVE);
  }

  public updatePosition(): void {

  }

  public attack(): void {
    const previousState = this.getCurrentState();
    this.setCurrentTemporaryState(EntityState.ATTACK, previousState);
  }

  public hurt(): void {
    const previousState = this.getCurrentState();
    this.setCurrentTemporaryState(EntityState.HURT, previousState);
  }

  public die(): void {
    this.setCurrentState(EntityState.DIE);
    this.getCurrentSprite().setStopLastFrame(true);
  }
  
}
