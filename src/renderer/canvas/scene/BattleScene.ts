import { BattleBackgroundAudio } from '@/renderer/audio/BattleBackgroundAudio';
import { PlayerComponent } from '@/renderer/canvas/scene/components/PlayerComponent';
import { Scene } from '@/renderer/canvas/scene/Scene';
import { GameResourceLoader } from '@/utils/GameResourceLoader';

export class BattleScene extends Scene {

  private backgroundAudio: BattleBackgroundAudio = new BattleBackgroundAudio();
  private playerComponent: PlayerComponent = new PlayerComponent();

  public async load(): Promise<void> {
    await GameResourceLoader.load(this.playerComponent);

    this.backgroundAudio.load();
    this.backgroundAudio.setVolume(0.1);
    this.backgroundAudio.play();

    const playerSprite = this.playerComponent.getIdleSprite();
    this.playerComponent.setX(0);
    this.playerComponent.setY(this.getHeight() / 2 - playerSprite.getSpriteHeight() / 2);
  }

  public action(): void {
    const playerSprite = this.playerComponent.getIdleSprite();
    this.drawSprite(playerSprite, this.playerComponent.getX(), this.playerComponent.getY(), 10);
  }
  
}
