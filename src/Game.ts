import { GameScreen } from '@/renderer/GameScreen';
import { BattleScene } from '@/scene/BattleScene';

export class Game {
 
  private readonly gameScreen: GameScreen = new GameScreen(1280, 720);
  private readonly battleScene: BattleScene = new BattleScene(this.gameScreen);

  public async start(): Promise<void> {
    console.log('Loading the battle scene');
    await this.battleScene.load();

    console.log('Starting the battle scene');
    this.battleScene.startScene();
  }

}
