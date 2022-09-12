import { BattleBackgroundAudio } from '@/renderer/audio/BattleBackgroundAudio';
import { Scene } from '@/renderer/canvas/scene/Scene';
import { BlueSlime } from '@/wrapper/player/BlueSlime';
import { Player } from '@/wrapper/player/Player';

export class BattleScene extends Scene {

  private backgroundAudio: BattleBackgroundAudio = new BattleBackgroundAudio();
  private player: Player = new Player(0, 0);
  private blueSlimes: BlueSlime[] = [];

  public async load(): Promise<void> {
    this.backgroundAudio.load();
    this.backgroundAudio.setVolume(0.1);
    this.backgroundAudio.play();

    await this.player.load();
    this.player.setX(0);
    this.player.setY(this.getHeight() / 2 - this.player.getCurrentSprite().getHeight() / 2);

    // for (let i = 0; i < 5; i++) {
    //   const blueSlime = new BlueSlime(0, 0);
    //   await blueSlime.load();

    //   const randomXOffset = Math.floor(Math.random() * 400) + 50;
    //   const randomYOffset = Math.floor(Math.random() * 500) - 300;
    //   blueSlime.setX(this.getWidth() - (blueSlime.getCurrentSprite().getWidth() * 2) - randomXOffset);
    //   blueSlime.setY((this.getHeight() / 2) - (blueSlime.getCurrentSprite().getHeight() / 2) + randomYOffset);

    //   this.blueSlimes.push(blueSlime);
    // }
  }

  public action(): void {
    this.drawEntity(this.player)

    // this.blueSlimes.forEach((blueSlime) => {
    //   this.drawEntity(blueSlime, 20);
    // });
  }
  
}
