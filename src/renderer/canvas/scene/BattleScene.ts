import { BattleBackgroundAudio } from '@/renderer/audio/BattleBackgroundAudio';
import { Scene } from '@/renderer/canvas/scene/Scene';
import { EntityState } from '@/wrapper/Entity';
import { Player } from '@/wrapper/player/Player';

export class BattleScene extends Scene {

  private backgroundAudio: BattleBackgroundAudio = new BattleBackgroundAudio();
  private player: Player = new Player(0, 0);

  public async load(): Promise<void> {
    this.backgroundAudio.load();
    this.backgroundAudio.setVolume(0.1);
    this.backgroundAudio.play();

    await this.player.load();
    this.player.setX(0);
    this.player.setY(this.getHeight() / 2 - this.player.getCurrentSprite().getSpriteHeight() / 2);
  }

  public action(): void {
    this.drawEntity(this.player, 10)

    if (this.sceneFrame === 500) {
      this.player.setCurrentState(EntityState.DIE);
    }
  }
  
}
