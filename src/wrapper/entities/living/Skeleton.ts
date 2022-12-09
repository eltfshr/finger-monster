import { EntityState } from '@/wrapper/entities/EntityState';
import { HostileCreature } from '@/wrapper/entities/HostileCreature';

export class Skeleton extends HostileCreature {

  protected health: number = 300;
  protected speedMultiplier: number = 0.5;

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
    if (!this.isPlaceHolder()) {
      this.setCurrentState(EntityState.DIE);
      this.getCurrentSprite().setStopLastFrame(true);
    }
  }
  
}
