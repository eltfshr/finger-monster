import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Creature } from '@/wrapper/entities/Creature';

export class EnemyBattleEvent {

  private uiRoot: BattleUserInterfaceRoot;

  public constructor(uiRoot: BattleUserInterfaceRoot) {
    this.uiRoot = uiRoot;
    console.log(this.uiRoot);
  }
  
  public onSpawn(): void {
    
  }

  public onAttack(enemy: Creature): void {
    enemy.attack();
  }

  public onHurt(enemy: Creature): void {
    enemy.hurt();
  }

  public onDie(enemy: Creature): void {
    enemy.die();
  }

}
