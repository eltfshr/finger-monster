import { EnemyBattleEvent } from '@/event/battle/EnemyBattleEvent';
import { PlayerBattleEvent } from '@/event/battle/PlayerBattleEvent';
import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { BattleScene } from '@/scene/BattleScene';
import { Creature } from '@/wrapper/entities/Creature';
import { Player } from '@/wrapper/entities/living/Player';

export class BattleEventManager {

  protected readonly uiRoot: BattleUserInterfaceRoot;

  private readonly playerEvent: PlayerBattleEvent;
  private readonly player: Player;
  private readonly enemyEvent: EnemyBattleEvent;

  public constructor(uiRoot: BattleUserInterfaceRoot, player: Player, battleScene: BattleScene) {
    this.uiRoot = uiRoot;
    this.enemyEvent = new EnemyBattleEvent(this.uiRoot);
    this.playerEvent = new PlayerBattleEvent(this.uiRoot, player);
    this.player = player;
  }

  public onPlayerAttack(): void {
    
  }

  public onPlayerHurt(damage: number): void {
    if (this.player.isDieing()) return;

    const isPlayerFatal = this.playerEvent.onHurt(damage);
    if (isPlayerFatal) this.onPlayerDie();
  }

  public onPlayerDie(): void {
    this.player.die();
  }

  public onPlayerMove(): void {
    !this.player.isMoving() && this.player.move();
  }

  public onPlayerStopMove(): void {
    this.player.idle();
  }

  public onPlayerJump(): void {
    this.player.jump();
  }

  public onEnemySpawn(): void {
    
  }

  public onEnemyAttack(enemy: Creature): void {
    this.enemyEvent.onAttack(enemy);
  }

  public onEnemyHurt(enemy: Creature): void {
    if (enemy.isDieing()) return;

    const isEnemyFatal = this.enemyEvent.onHurt(enemy);
    if (isEnemyFatal) this.onEnemyDie(enemy);
  }

  public onEnemyDie(enemy: Creature): void {
    if (Math.random() > 0.5) {
      console.log('Item dropped');
    }
    this.enemyEvent.onDie(enemy);
  }

  public onSignCorrect(): void {
    
  }

  public onCharacterChange(character: string): void {
    this.uiRoot.updateCharacter(character);
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
