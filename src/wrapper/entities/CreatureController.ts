import { Creature } from '@/wrapper/entities/Creature';

export class CreatureController {
  
  public spawn(creature: Creature) {
    console.log(creature);
  }

  public attack(attacker: Creature, victim: Creature): void {
    attacker.attack();
    victim.damage();
  }

}
