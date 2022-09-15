import { BattleEventManager } from '@/event/battle/BattleEventManger';
import { BattleBackgroundAudio } from '@/renderer/audio/BattleBackgroundAudio';
import { Background } from '@/renderer/canvas/object/Background';
import { BattleUIManager } from '@/renderer/ui/battleui/BattleUIManager';
import { Scene } from '@/scene/Scene';
import { Player } from '@/wrapper/entities/living/Player';

export class BattleScene extends Scene {

  private readonly baseBackground     = new Background('bg/battle/base.png');
  private readonly midBackground      = new Background('bg/battle/mid.png');
  private readonly backgroundAudio    = new BattleBackgroundAudio();

  private readonly player: Player     = new Player(0, 0);
  private uiManager: BattleUIManager = new BattleUIManager();
  private eventManager: BattleEventManager = new BattleEventManager(this.uiManager);

  public async load(): Promise<void> {
    await this.baseBackground.load();
    await this.midBackground.load();
    this.baseBackground.apply(this.getWidth(), this.getHeight());
    this.midBackground.apply(this.getWidth(), this.getHeight());

    await this.backgroundAudio.load();
    this.backgroundAudio.setVolume(0.1);
    // this.backgroundAudio.play();

    await this.player.load();
    this.player.setX(0);
    this.player.setY(this.getHeight() * 0.6);
  }

  public update(): void {
    this.updateAllBackgrounds();
    this.drawEntity(this.player, 1.25)
    if (this.sceneFrame % 100 == 0) {
      this.eventManager.onPlayerHurt(this.player);
    }
  }

  private updateAllBackgrounds(): void {
    if (this.sceneFrame % 3 === 0) {
      this.baseBackground.move(1);
      this.midBackground.move(2);
    }

    this.baseBackground.draw(this.getCanvasContext());
    this.midBackground.draw(this.getCanvasContext());
  }
  
}
