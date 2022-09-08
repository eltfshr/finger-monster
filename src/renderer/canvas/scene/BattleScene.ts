import { BattleBackgroundAudio } from '@/renderer/audio/BattleBackgroundAudio';
import { PlayerComponent } from '@/renderer/canvas/scene/components/PlayerComponent';
import { Scene } from '@/renderer/canvas/scene/Scene';
import { GameResourceLoader } from '@/utils/GameResourceLoader';
import { BlueSlimeComponent } from './components/BlueSlimeComponent';

export class BattleScene extends Scene {

  private backgroundAudio: BattleBackgroundAudio = new BattleBackgroundAudio();
  private playerComponent: PlayerComponent = new PlayerComponent();
  private blueSlimeComponent: BlueSlimeComponent = new BlueSlimeComponent();

  public async load(): Promise<void> {
    await GameResourceLoader.load(this.playerComponent);
    await GameResourceLoader.load(this.blueSlimeComponent);

    this.backgroundAudio.load();
    this.backgroundAudio.setVolume(0.1);
    this.backgroundAudio.play();

    const playerSprite = this.playerComponent.getIdleSprite();
    this.playerComponent.setX(0);
    this.playerComponent.setY(this.getHeight() / 2 - playerSprite.getSpriteHeight() / 2);

    const blueSlimeSprite = this.blueSlimeComponent.getAttackSprite();
    this.blueSlimeComponent.setX(this.getWidth() - (blueSlimeSprite.getSpriteWidth() * 3) - 100);
    this.blueSlimeComponent.setY(this.getHeight() / 2 - blueSlimeSprite.getSpriteHeight() / 2);
  }

  public action(): void {
    const playerSprite = this.playerComponent.getIdleSprite();
    this.drawSprite(playerSprite, this.playerComponent.getX(), this.playerComponent.getY(), 10);

    const blueSlimeSprite = this.blueSlimeComponent.getAttackSprite();
    this.drawSprite(blueSlimeSprite, this.blueSlimeComponent.getX(), this.blueSlimeComponent.getY(), 10, 3);
  }
  
}
