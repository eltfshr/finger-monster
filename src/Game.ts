import { BattleScene } from '@/renderer/canvas/scene/BattleScene';

export class Game {
 
  private readonly battleScene: BattleScene = new BattleScene(1280, 720);

  public async start(): Promise<void> {
    console.log('Loading the battle scene');
    await this.battleScene.load();

    console.log('Starting the battle scene');
    this.battleScene.startScene();
  }

}
