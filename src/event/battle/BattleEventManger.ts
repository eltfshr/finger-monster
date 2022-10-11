import { EnemyBattleEvent } from '@/event/battle/EnemyBattleEvent';
import { PlayerBattleEvent } from '@/event/battle/PlayerBattleEvent';
import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Creature } from '@/wrapper/entities/Creature';
import { Player } from '@/wrapper/entities/living/Player';

export class BattleEventManager {

  protected uiRoot: BattleUserInterfaceRoot;

  private playerEvent: PlayerBattleEvent;
  private enemyEvent: EnemyBattleEvent;

  public constructor(uiRoot: BattleUserInterfaceRoot) {
    this.uiRoot = uiRoot;
    this.playerEvent = new PlayerBattleEvent(this.uiRoot);
    this.enemyEvent = new EnemyBattleEvent(this.uiRoot);
  }

  public onPlayerAttack(player: Player): void {
    this.playerEvent.onAttack(player);
  }

  public onPlayerHurt(player: Player): void {
    player.setHealth(player.getHealth() - 20);

    this.playerEvent.onHurt(player);

    if (player.getHealth() <= 0) {
      this.onPlayerDie(player);
    }
  }

  public onPlayerDie(player: Player): void {
    this.playerEvent.onDie(player);
  }

  public onEnemySpawn(): void {
    
  }

  public onEnemyAttack(enemy: Creature): void {
    this.enemyEvent.onAttack(enemy);
  }

  public onEnemyHurt(enemy: Creature): void {
    enemy.setHealth(enemy.getHealth() - 10);

    this.enemyEvent.onHurt(enemy);

    if (enemy.getHealth() <= 0) {
      this.onEnemyDie(enemy);
    }
  }

  public onEnemyDie(enemy: Creature): void {
    if (Math.random() > 0.5) {
      console.log('Item dropped');
    }
    this.enemyEvent.onDie(enemy);
  }

  public onSignCorrect(): void {
    
  }

  public onItemSpawn(): void {

  }

  public onItemCollect(): void {

  }

  public onItemUse(): void {

  }

  public onItemDestroy(): void {

  }

}
