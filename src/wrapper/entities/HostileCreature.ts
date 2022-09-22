import { Creature } from '@/wrapper/entities/Creature';

export abstract class HostileCreature extends Creature {

  public awake(): void {
    if (this.isAttacking() || this.isHurting() || this.isDieing()) return;
    this.attack();
    this.setX(this.getX() - this.getVelocity());
  }

}
