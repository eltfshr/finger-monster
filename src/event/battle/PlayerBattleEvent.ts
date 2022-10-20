import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Player } from '@/wrapper/entities/living/Player';

export class PlayerBattleEvent {

  private readonly uiRoot: BattleUserInterfaceRoot;
  private readonly player: Player;

  public constructor(uiRoot: BattleUserInterfaceRoot, player: Player) {
    this.uiRoot = uiRoot;
    this.player = player;
  }
  
  public onAttack(): void {
    this.player.attack();
  }

  public onHurt(damage: number): boolean {
    if (this.player.isDieing()) return true;

    this.player.hurt();
    this.player.setHealth(this.player.getHealth() - damage);
    this.uiRoot.updateHealth(this.player.getHealth());

    const isFatal = (this.player.getHealth() <= 0);
    if (isFatal) this.onDie();
    return isFatal;
  }

  public onDie(): void {
    this.player.die();
  }

}
