import { BattleEventManager } from '@/event/battle/BattleEventManger';
import { BattleBackgroundAudio } from '@/renderer/audio/BattleBackgroundAudio';
import { BattleImageRegistry } from '@/renderer/BattleImageRegistry';
import { Background } from '@/renderer/canvas/object/Background';
import { Ground } from '@/renderer/canvas/object/Ground';
import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Scene } from '@/scene/Scene';
import { CreatureSpawner } from '@/wrapper/entities/CreatureSpawner';
import { Player } from '@/wrapper/entities/living/Player';

export class BattleScene extends Scene {

  private readonly imageRegistry      = new BattleImageRegistry();
  private readonly baseBackground     = new Background(this.imageRegistry);
  private readonly midBackground      = new Background(this.imageRegistry);
  private readonly ground             = new Ground(this.imageRegistry);

  private readonly backgroundAudio    = new BattleBackgroundAudio();

  private readonly creatureSpawner    = new CreatureSpawner();
  private readonly player             = new Player(0, 0);

  private readonly uiRoot             = new BattleUserInterfaceRoot(this.player);
  private readonly eventManager       = new BattleEventManager(this.uiRoot);

  public async load(): Promise<void> {
    await this.imageRegistry.load(),

    // await Promise.all([
    //   this.imageRegistry.load(),
    //   this.backgroundAudio.load(),
    //   this.ground.load(),
    //   this.player.load(),
    // ]);

    this.backgroundAudio.setVolume(0.25);
    // this.backgroundAudio.play();

    this.baseBackground
      .setImage('bg/battle/base.png')
      .setScene(this);
    this.midBackground
      .setImage('bg/battle/mid.png')
      .setScene(this);

    this.ground
      .setImage('tiles/tileset1.png')
      .setSize(16)
      .setScene(this)
      .apply(this.getHeight() * 0.2, 2)
      .init();

    this.creatureSpawner.apply(this, this.getHeight() * 0.6, this.getHeight() * 0.22);

    this.player.setX(this.getWidth() / 9);
    this.player.setY(this.getHeight() * 0.61);
    this.player.move();
  }

  public update(): void {
    this.updateAllBackgrounds();
    this.drawEntity(this.player, 1.25);

    // if (this.sceneFrame === 100) {
    //   this.player.idle();
    //   this.player.attack();
    // }

    // this.creatureSpawner.getSpawnedCreatures().forEach((creature) => {
    //   !creature.isAttacking() && creature.attack();
    //   creature.setX(creature.getX() - 1);
    //   // console.log(creature.getX(), creature.getY());
    //   this.drawEntity(creature, 3.0);
    // });

    // if (this.sceneFrame === 100) {
    //   this.creatureSpawner.spawn();
    //   console.log('spawn');
    // }
  }

  private updateAllBackgrounds(): void {
    if ((this.player.isMoving()) && (this.sceneFrame % 3 === 0)) {
      this.baseBackground.move(1);
      this.midBackground.move(2);
      this.ground.move(3);
    }

    this.baseBackground.draw(this.getCanvasContext());
    this.midBackground.draw(this.getCanvasContext());
    this.ground.draw(this.getCanvasContext());
  }
  
}
