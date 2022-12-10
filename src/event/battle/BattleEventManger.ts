import { EnemyBattleEvent } from "@/event/battle/EnemyBattleEvent";
import { PlayerBattleEvent } from "@/event/battle/PlayerBattleEvent";
import { AudioResource } from "@/renderer/audio/AudioResource";
import { BattleUserInterfaceRoot } from "@/renderer/ui/battle/BattleUserInterfaceRoot";
import { Creature } from "@/wrapper/entities/Creature";
import { HostileCreature } from '@/wrapper/entities/HostileCreature';
import { Player } from "@/wrapper/entities/living/Player";

export class BattleEventManager {
  protected readonly uiRoot: BattleUserInterfaceRoot;

  private readonly playerEvent: PlayerBattleEvent;
  private readonly player: Player;
  private readonly enemyEvent: EnemyBattleEvent;
  private readonly walkSound: AudioResource = new AudioResource(
    "audio/character/slime/walk.mp3"
  );
  private readonly attackSound: AudioResource = new AudioResource(
    "audio/character/player/attack.mp3"
  );
  private readonly hurtSound: AudioResource = new AudioResource(
    "audio/character/player/hurt.mp3"
  );
  private readonly deathSound: AudioResource = new AudioResource(
    "audio/character/player/death.m4a"
  );
  private readonly jumpSound: AudioResource = new AudioResource(
    "audio/character/player/jump.m4a"
  );

  public constructor(uiRoot: BattleUserInterfaceRoot, player: Player) {
    this.uiRoot = uiRoot;
    this.enemyEvent = new EnemyBattleEvent(this.uiRoot);
    this.playerEvent = new PlayerBattleEvent(this.uiRoot, player);
    this.player = player;
    this.walkSound.load().then();
    this.attackSound.load().then();
    this.attackSound.setLoop(false);
    this.hurtSound.load().then();
    this.hurtSound.setLoop(false);
    this.deathSound.load().then();
    this.deathSound.setLoop(false);
    this.jumpSound.load().then();
    this.jumpSound.setLoop(false);
  }

  public onPlayerAttack(): void {
    this.attackSound.play();
  }

  public onPlayerHurt(damage: number): void {
    if (this.player.isDieing()) return;

    const isPlayerFatal = this.playerEvent.onHurt(damage);
    if (isPlayerFatal) {
      this.deathSound.play();
      this.onPlayerDie();
    } else {
      this.hurtSound.play();
    }
  }

  public onPlayerDie(): void {
    this.player.die();
  }

  public onPlayerMove(): void {
    if (!this.player.isMoving()) {
      this.walkSound.play();
    }
    !this.player.isMoving() && this.player.move();
  }

  public onPlayerStopMove(): void {
    this.walkSound.stop();
    this.player.idle();
  }

  public onPlayerJump(): void {
    this.jumpSound.play();
    this.player.jump();
  }

  public onEnemySpawn(): void {}

  public onEnemyAttack(enemy: Creature): void {
    this.enemyEvent.onAttack(enemy);
  }

  public onEnemyHurt(enemy: Creature): void {
    if (enemy.isDieing()) return;

    const isEnemyFatal = this.enemyEvent.onHurt(enemy);
    this.uiRoot.updateScore(enemy.getHealth());
    if (isEnemyFatal) this.onEnemyDie(enemy);
  }

  public onEnemyDie(enemy: Creature): void {
    if (Math.random() > 0.5) {
      console.log("Item dropped");
    }
    this.uiRoot.updateScore(((enemy as HostileCreature).getDamage()) * (enemy as HostileCreature).getSpeedMultiplier());
    this.enemyEvent.onDie(enemy);
  }

  public onTargetMove(x: number, y: number): void {
    this.uiRoot.updateTarget(x, y);
  }

  public onSignCorrect(enemy :Creature): void {
    this.uiRoot.updateScore(100);
  }

  public onCharacterChange(character: string): void {
    this.uiRoot.updateCharacter(character);
  }

  public onWaveChange(wave: number): void {
    this.uiRoot.updateWave(Math.floor((wave - 1) / 2) + 1);
  }

  public onItemSpawn(): void {}

  public onItemCollect(): void {}

  public onItemUse(): void {}

  public onItemDestroy(): void {}
}
