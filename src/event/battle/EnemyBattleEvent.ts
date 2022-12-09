import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Creature } from '@/wrapper/entities/Creature';

export class EnemyBattleEvent {

  private uiRoot: BattleUserInterfaceRoot;

  public constructor(uiRoot: BattleUserInterfaceRoot) {
    this.uiRoot = uiRoot;
  }
  
  public onSpawn(): void {
    
  }

  public onAttack(enemy: Creature): void {
    enemy.attack();
  }

  public onHurt(enemy: Creature): boolean {
    if (enemy.isDieing()) return true;

    enemy.move();
    enemy.hurt();
    enemy.setHealth(enemy.getHealth() - 100);
    //this.uiRoot.updateHealth(enemy.getHealth());

    const isFatal = (enemy.getHealth() <= 0);
    return isFatal;
  }

  public onDie(enemy: Creature): void {
    enemy.die();
  }

}
