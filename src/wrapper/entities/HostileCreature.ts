import { Creature } from '@/wrapper/entities/Creature';

export abstract class HostileCreature extends Creature {

  protected damage: number = 10;
  protected speedMultiplier: number = 1;

  public getDamage(): number {
    return this.damage;
  }

  public setDamage(damage: number): Creature {
    this.damage = damage;
    return this;
  }

  public getSpeedMultiplier(): number {
    return this.speedMultiplier;
  }

  public setSpeedMultiplier(speedMultiplier: number): Creature {
    this.speedMultiplier = speedMultiplier;
    return this;
  }

  public awake(): void {
    if (this.isAttacking() || this.isHurting() || this.isDieing()) return;
    this.attack();
    this.setX(this.getX() - this.getXVelocity());
  }

}
