import { PlayerBattleEvent } from '@/event/battle/PlayerBattleEvent';
import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Player } from '@/wrapper/entities/living/Player';

export class BattleEventManager {

  protected uiRoot: BattleUserInterfaceRoot;

  private playerEvent: PlayerBattleEvent;

  public constructor(uiRoot: BattleUserInterfaceRoot) {
    this.uiRoot = uiRoot;
    this.playerEvent = new PlayerBattleEvent(this.uiRoot);
  }

  public onPlayerDie(player: Player): void {
    this.playerEvent.onDie(player);
  }

  public onPlayerHurt(player: Player): void {
    player.setHealth(player.getHealth() - 10);

    this.playerEvent.onHurt(player.getHealth());

    if (player.getHealth() <= 0) {
      this.onPlayerDie(player);
    }
  }

}
