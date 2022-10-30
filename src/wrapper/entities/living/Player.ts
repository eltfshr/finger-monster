import { AttackSpriteResource } from '@/renderer/canvas/sprite/AttackSpriteResource';
import { Arrow } from '@/wrapper/entities/Arrow';
import { Creature } from '@/wrapper/entities/Creature';
import { EntityState } from '@/wrapper/entities/EntityState';
import { Projectile } from '@/wrapper/entities/Projectile';

export class Player extends Creature {

  public idle(): void {
    this.setCurrentState(EntityState.IDLE);
  }

  public move(): void {
    this.setCurrentState(EntityState.MOVE);
  }

  public updatePosition(): void {

  }

  public attack(): Projectile {
    const previousState = this.getCurrentState();
    this.setCurrentTemporaryState(EntityState.ATTACK, previousState);

    return new Arrow()
      .setSpeedMultiplier(30)
      .setAttackFrame((this.animation!.getCurrentSprite() as AttackSpriteResource).getAttackFrame());
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

