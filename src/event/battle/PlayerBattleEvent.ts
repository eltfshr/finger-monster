import { BattleUIManager } from '@/renderer/ui/battleui/BattleUIManager';
import { Player } from '@/wrapper/entities/living/Player';

export class PlayerBattleEvent {

  private uiManager: BattleUIManager;

  public constructor(uiManager: BattleUIManager) {
    this.uiManager = uiManager;
  }
  
  public onHurt(health: number): void {
    this.uiManager.updateHealth(health);
  }

  public onDie(player: Player): void {
    player.die();
  }

}
