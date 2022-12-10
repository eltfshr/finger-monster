import { BattleHealthBar } from '@/renderer/ui/battle/BattleHealthBar';
import { BattleManaBar } from '@/renderer/ui/battle/BattleManaBar';
import { BattlePlayerFrame } from '@/renderer/ui/battle/BattlePlayerFrame';
import { BattlePlayerFrameBorder } from '@/renderer/ui/battle/BattlePlayerFrameBorder';
import { CameraCanvas } from '@/renderer/ui/battle/CameraCanvas';
import { CharacterBar } from '@/renderer/ui/battle/CharacterBar';
import { PlayerCharacterBar } from '@/renderer/ui/battle/PlayerCharacterBar';
import { Score } from '@/renderer/ui/battle/Score';
import { TargetIndicator } from '@/renderer/ui/battle/TargetIndicator';
import { UserInterfaceRoot } from '@/renderer/ui/UserInterfaceRoot';
import { Player } from '@/wrapper/entities/living/Player';

export class BattleUserInterfaceRoot extends UserInterfaceRoot {

  private readonly player: Player;

  private readonly loadingOverlay = document.createElement('div');
  private readonly loadingUi = document.createElement('div');
  private readonly playerHudRoot = document.createElement('div');
  private readonly playerFrame: BattlePlayerFrame;
  private readonly playerFrameBorder: BattlePlayerFrameBorder;
  private readonly healthBar: BattleHealthBar;
  private readonly manaBar: BattleManaBar;
  private readonly characterBar: CharacterBar;
  private readonly targetIndicator: TargetIndicator;
  private readonly cameraCanvas: CameraCanvas;
  private readonly playerCharacterbar: PlayerCharacterBar;
  private readonly score: Score;

  public constructor(player: Player) {
    super();
    this.loadingOverlay.setAttribute('id', 'loading-overlay');
    this.append(this.loadingOverlay);

    this.loadingUi.setAttribute('id', 'loading-ui');
    this.loadingUi.innerHTML = 'Press any key to start!';
    this.append(this.loadingUi);

    this.playerHudRoot.setAttribute('id', 'player-info-hud');
    this.playerHudRoot.style.display = 'none';
    this.append(this.playerHudRoot);

    this.player = player;
    this.characterBar = new CharacterBar();
    this.playerHudRoot.append(this.characterBar.getNode());

    this.healthBar = new BattleHealthBar();
    this.playerHudRoot.append(this.healthBar.getNode());

    this.manaBar = new BattleManaBar();
    this.playerHudRoot.append(this.manaBar.getNode());

    this.playerFrame = new BattlePlayerFrame();
    this.playerHudRoot.append(this.playerFrame.getNode());

    this.playerFrameBorder = new BattlePlayerFrameBorder();
    this.playerHudRoot.append(this.playerFrameBorder.getNode());

    this.targetIndicator = new TargetIndicator();
    this.playerHudRoot.append(this.targetIndicator.getNode())
  
    this.cameraCanvas = new CameraCanvas();
    this.playerHudRoot.append(this.cameraCanvas.getNode())

    this.playerCharacterbar = new PlayerCharacterBar();
    this.playerHudRoot.append(this.playerCharacterbar.getNode())
    
    this.score = new Score();
    this.playerHudRoot.append(this.score.getNode())
    
  }

  public updateHealth(health: number): void {
    this.healthBar.update(health);
  }

  public updateMana(mana: number): void {
    this.manaBar.update(mana);
  }

  public updateCharacter(character: string): void {
    this.characterBar.update(character);
  }

  public updateTarget(x: number, y: number): void {
    this.targetIndicator.update(x, y);
  }

  public updatePlayerCharacter(character: string): void {
    this.playerCharacterbar.update(character);
  }
  
  public updateScore(score: number): void {
    this.score.update(score);
  }

}
