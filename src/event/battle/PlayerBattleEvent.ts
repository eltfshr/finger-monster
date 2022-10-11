import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Player } from '@/wrapper/entities/living/Player';

export class PlayerBattleEvent {

  private uiRoot: BattleUserInterfaceRoot;

  public constructor(uiRoot: BattleUserInterfaceRoot) {
    this.uiRoot = uiRoot;
  }
  
  public onAttack(player: Player): void {
    player.attack();
  }

  public onHurt(player: Player): void {
    player.hurt();
    this.uiRoot.updateHealth(player.getHealth());
  }

  public onDie(player: Player): void {
    player.die();
  }

}
