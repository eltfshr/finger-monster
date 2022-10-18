import { BattleHealthBar } from '@/renderer/ui/battle/BattleHealthBar';
import { BattleManaBar } from '@/renderer/ui/battle/BattleManaBar';
import { BattlePlayerFrame } from '@/renderer/ui/battle/BattlePlayerFrame';
import { BattlePlayerFrameBorder } from '@/renderer/ui/battle/BattlePlayerFrameBorder';
import { UserInterfaceRoot } from '@/renderer/ui/UserInterfaceRoot';
import { Player } from '@/wrapper/entities/living/Player';

export class BattleUserInterfaceRoot extends UserInterfaceRoot {

  private readonly player: Player;

  private readonly playerFrame: BattlePlayerFrame;
  private readonly playerFrameBorder: BattlePlayerFrameBorder;
  private readonly healthBar: BattleHealthBar;
  private readonly manaBar: BattleManaBar;
  
  public constructor(player: Player) {
    super();
    this.player = player;

    this.healthBar = new BattleHealthBar();
    this.append(this.healthBar.getNode());

    this.manaBar = new BattleManaBar();
    this.append(this.manaBar.getNode());

    this.playerFrame = new BattlePlayerFrame();
    this.append(this.playerFrame.getNode());

    this.playerFrameBorder = new BattlePlayerFrameBorder();
    this.append(this.playerFrameBorder.getNode());
  }

  public updateHealth(health: number): void {
    this.healthBar.update(health);
  }

  public updateMana(mana: number): void {
    this.manaBar.update(mana);
  }

}
