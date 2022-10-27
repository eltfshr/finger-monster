import { BattleEventManager } from '@/event/battle/BattleEventManger';
import { BattleBackgroundAudio } from '@/renderer/audio/BattleBackgroundAudio';
import { BattleImageRegistry } from '@/renderer/BattleImageRegistry';
import { Background } from '@/renderer/canvas/object/Background';
import { Ground } from '@/renderer/canvas/object/Ground';
import { PlayerAnimation } from '@/renderer/canvas/sprite/entities/PlayerAnimation';
import { ItemEntityAnimation } from '@/renderer/canvas/sprite/ItemEntityAnimation';
import { CollisionRegistry } from '@/renderer/collision/CollisionRegistry';
import { ItemImageRegistry } from '@/renderer/ItemImageRegistry';
import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Scene } from '@/scene/Scene';
import { CreatureSpawner } from '@/wrapper/entities/CreatureSpawner';
import { TestItem } from '@/wrapper/entities/items/TestItem';
import { Player } from '@/wrapper/entities/living/Player';

export class BattleScene extends Scene {

  private readonly imageRegistry      = new BattleImageRegistry();
  private readonly collisionRegistry  = new CollisionRegistry();
  private readonly itemRegistry       = new ItemImageRegistry();  

  private readonly baseBackground     = new Background(this.imageRegistry);
  private readonly midBackground      = new Background(this.imageRegistry);
  private readonly ground             = new Ground(this.imageRegistry);

  private readonly backgroundAudio    = new BattleBackgroundAudio();

  private readonly creatureSpawner    = new CreatureSpawner(this.imageRegistry, this.collisionRegistry);
  private readonly player             = new Player();

  private readonly uiRoot             = new BattleUserInterfaceRoot(this.player);
  private readonly eventManager       = new BattleEventManager(this.uiRoot);

  private readonly item               = new TestItem();

  public async load(): Promise<void> {
    await Promise.all([
      this.imageRegistry.load(),
      this.itemRegistry.load(),
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
      .apply(this.getHeight() * 0.6, this.getHeight() * 0.22);

    this.player.setAnimation(new PlayerAnimation(this.imageRegistry, this.collisionRegistry));
    this.player.setX(this.getWidth() / 9);
    this.player.setY(this.getHeight() * 0.61);
    this.player.move();

    this.item.setAnimation(new ItemEntityAnimation(this.itemRegistry,'item/testitem.png'));
    this.item.setX(this.getWidth() / 9);
    this.item.setY(this.getHeight() * 0.61);
    
  }

  public update(): void {
    this.updateAllBackgrounds();
    this.drawEntity(this.player, 1.25);
    this.drawItem(this.item, 0.5);

    if (this.sceneFrame === 100) {
      this.player.attack();
      this.player.idle();
    }

    this.creatureSpawner.getSpawnedCreatures().forEach((creature) => {
      !creature.isAttacking() && creature.attack();
      creature.setX(creature.getX() - 1);
      // console.log(creature.getX(), creature.getY());
      this.drawEntity(creature, 3.0);
    });

    if (this.sceneFrame === 100) {
      this.creatureSpawner.spawn();
    }
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
