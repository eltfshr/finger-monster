import { BattleHealthBar } from '@/renderer/ui/battleui/BattleHealthBar';
import { UIManager } from '@/renderer/ui/UIManager';

export class BattleUIManager extends UIManager {

  private readonly healthBar: BattleHealthBar;
  
  public constructor() {
    super();
    this.healthBar = new BattleHealthBar(this.ui);
  }

  public updateHealth(health: number): void {
    this.healthBar.updateHealth(health);
  }

}
