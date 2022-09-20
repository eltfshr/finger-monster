import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Player } from '@/wrapper/entities/living/Player';

export class PlayerBattleEvent {

  private uiRoot: BattleUserInterfaceRoot;

  public constructor(uiRoot: BattleUserInterfaceRoot) {
    this.uiRoot = uiRoot;
  }
  
  public onHurt(health: number): void {
    this.uiRoot.updateHealth(health);
  }

  public onDie(player: Player): void {
    player.die();
  }

}
