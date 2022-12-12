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

  public onManaChange(mana: number): void {
    this.player.setMana(this.player.getMana() + mana);
    this.uiRoot.updateMana(this.player.getMana());
  }

  public onHurt(damage: number): boolean {
    if (this.player.isDieing()) return true;
    if (!this.player.isHurting() && !this.player.isAttacking()) {
      this.player.idle();
      this.player.hurt();
    }
    this.player.setHealth(this.player.getHealth() - damage);
    this.uiRoot.updateHealth(this.player.getHealth());

    const isFatal = (this.player.getHealth() <= 0);
    return isFatal;
  }

  public onDie(): void {
    this.player.die();
  }

}
