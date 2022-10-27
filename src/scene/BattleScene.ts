import { BattleEventManager } from '@/event/battle/BattleEventManger';
import { BattleBackgroundAudio } from '@/renderer/audio/BattleBackgroundAudio';
import { BattleImageRegistry } from '@/renderer/BattleImageRegistry';
import { CollisionRegistry } from '@/renderer/collision/CollisionRegistry';
import { Background } from '@/renderer/object/Background';
import { Ground } from '@/renderer/object/Ground';
import { PlayerAnimation } from '@/renderer/sprite/entities/PlayerAnimation';
import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Scene } from '@/scene/Scene';
import { CreatureSpawner } from '@/wrapper/entities/CreatureSpawner';
import { EntityState } from '@/wrapper/entities/EntityState';
import { BlueSlime } from '@/wrapper/entities/living/BlueSlime';
import { Player } from '@/wrapper/entities/living/Player';

export class BattleScene extends Scene {

  private readonly imageRegistry      = new BattleImageRegistry();
  private readonly collisionRegistry  = new CollisionRegistry();

  private readonly baseBackground     = new Background(this.imageRegistry);
  private readonly midBackground      = new Background(this.imageRegistry);
  private readonly ground             = new Ground(this.imageRegistry);

  private readonly backgroundAudio    = new BattleBackgroundAudio();

  private readonly creatureSpawner    = new CreatureSpawner(this.imageRegistry, this.collisionRegistry);
  private readonly player             = new Player();

  private readonly uiRoot             = new BattleUserInterfaceRoot(this.player);
  private readonly eventManager       = new BattleEventManager(this.uiRoot, this.player);

  private attackInterval: NodeJS.Timer | undefined;
  private relativeVelocity: number = 1.0;

  public async load(): Promise<void> {
    await Promise.all([
      this.imageRegistry.load(),
      this.backgroundAudio.load(),
    ]);

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

    this.creatureSpawner
      .setScene(this)

    this.player.setAnimation(new PlayerAnimation(this.imageRegistry, this.collisionRegistry));
    this.player.setScale(1.25);
    this.player.setX(this.getWidth() / 9);
    this.player.setYOnGround(this.ground);
    this.player.idle();
  }

  public update(): void {
    this.updateAllBackgrounds();
    this.drawEntity(this.player);

    if (this.sceneFrame === 100) {
      this.player.move();
    }

    this.creatureSpawner.getSpawnedCreatures().forEach((creature) => {
      if (creature.getCurrentState() === EntityState.MOVE) {
        creature.setX(creature.getX() - (1.3 * this.relativeVelocity));
      }

      this.drawEntity(creature);

      if ((this.player.getCurrentState() !== EntityState.DIE) && creature.isCollide(this.player)) {
        this.player.idle();
        creature.attack();

        this.attackInterval = setInterval(() => {
          this.eventManager.onPlayerHurt(10);
        }, 1000);
      }
    });

    if (this.player.isDieing() && this.attackInterval) {
      clearInterval(this.attackInterval);
      this.attackInterval = undefined;
      this.creatureSpawner.getSpawnedCreatures().forEach((creature) => {
        creature.idle();
      });
    }

    if (this.sceneFrame === 100) {
      const spawnedCreate = this.creatureSpawner.spawn(BlueSlime, this.ground, 3);
      spawnedCreate.move();
    }
  }

  private updateAllBackgrounds(): void {
    if ((this.player.isMoving()) && (this.sceneFrame % 3 === 0)) {
      this.baseBackground.move(1 * this.relativeVelocity);
      this.midBackground.move(2 * this.relativeVelocity);
      this.ground.move(3 * this.relativeVelocity);
    }

    this.baseBackground.draw(this.getCanvasContext());
    this.midBackground.draw(this.getCanvasContext());
    this.ground.draw(this.getCanvasContext());
  }
  
}
