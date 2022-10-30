import { BattleEventManager } from '@/event/battle/BattleEventManger';
import { BattleBackgroundAudio } from '@/renderer/audio/BattleBackgroundAudio';
import { BattleImageRegistry } from '@/renderer/BattleImageRegistry';
import { Background } from '@/renderer/canvas/object/Background';
import { Ground } from '@/renderer/canvas/object/Ground';
import { ArrowAnimation } from '@/renderer/canvas/sprite/entities/ArrowAnimation';
import { PlayerAnimation } from '@/renderer/canvas/sprite/entities/PlayerAnimation';
import { CollisionRegistry } from '@/renderer/collision/CollisionRegistry';
import { PhysicsEngine } from '@/renderer/PhysicsEngine';
import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Scene } from '@/scene/Scene';
import { CreatureSpawner } from '@/wrapper/entities/CreatureSpawner';
import { Player } from '@/wrapper/entities/living/Player';
import { Projectile } from '@/wrapper/entities/Projectile';

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

  private readonly physicsEngine      = new PhysicsEngine();
  private readonly projectiles: Projectile[] = [];

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
    // this.player.setY(0);
    this.player.setYOnGround(this.ground);
    this.player.idle();

    // this.eventManager.onPlayerHurt(50);

    // const arrow = new Arrow();
    // arrow.setAnimation(new ArrowAnimation(this.imageRegistry, this.collisionRegistry));
    // arrow.setX(this.player.getX() + 50);
    // arrow.setY(this.player.getY());
  }

  public update(): void {
    this.updateAllBackgrounds();
    this.drawEntity(this.player);
    this.physicsEngine.gravitate(this.player, this.ground);

    const nearEnermy = this.physicsEngine.getNearestCreature(
      this.player
    , this.creatureSpawner.getSpawnedCreatures());

    this.projectiles.slice().reverse().forEach((projectile, index, array) => {
      projectile.nextFrameCount();
      if (projectile.getFrameCount() < projectile.getAttackFrame() * this.player.getAnimation().getCurrentSprite().getFrameHold()) {
        return
      } else if (projectile.getFrameCount() == projectile.getAttackFrame() * this.player.getAnimation().getCurrentSprite().getFrameHold()) {
        projectile.setTarget(nearEnermy!);
        projectile.setX(this.player.getRealX() + this.player.getRealWidth());
        projectile.setY(this.player.getRealY() + this.player.getRealHeight() / 2);
      }
      
      this.drawEntity(projectile);
      
      const isProjectileHit = this.physicsEngine.projectileMotion(projectile, projectile.getTarget(), this.ground);
      if (isProjectileHit) {
        if (projectile.isCollide(projectile.getTarget())) {
          // projectile.getTarget().attack();
          projectile.getTarget().die();
        }
        this.projectiles.splice(array.length - 1 - index, 1);
      }
    });

    if (this.sceneFrame === 100 || this.sceneFrame === 200 || this.sceneFrame === 300) {
      this.player.idle();
      const arrow = this.player.attack();
      arrow.setAnimation(new ArrowAnimation(this.imageRegistry, this.collisionRegistry));
      this.projectiles.push(arrow);
      // this.player.jump();
    }

    // if (this.sceneFrame % 200 === 0) {
    //   // this.player.idle()
    //   this.player.setHealth(this.player.getHealth() - 10);
    //   this.eventManager.onPlayerHurt(10);
    // }

    if (this.sceneFrame === 1200) {
      this.player.move();
    }

    if (this.sceneFrame === 1600) {
      this.player.die();
    }

    // if (this.sceneFrame % 120 === 0) {
    //   this.uiRoot.updateMana(this.player.getHealth());
    // }

    // if (this.sceneFrame === 100) {
    //   this.player.attack();
    //   this.player.idle();
    // }

    this.creatureSpawner.getSpawnedCreatures().forEach((creature) => {
      // !creature.isAttacking() && creature.attack();
      !this.player.isMoving() && !creature.isDieing() && creature.setX(creature.getX() - 1);
      this.player.isMoving() && creature.setX(creature.getX() - 1);
      this.drawEntity(creature);
      if (creature.isCollide(this.player)) {
        console.log('hit');
      }
    });

    if (this.sceneFrame === 50 || this.sceneFrame === 120 || this.sceneFrame === 200) {
      this.creatureSpawner.spawn(this.ground, 3);
    }
    // if (this.sceneFrame === 120) {
    //   this.creatureSpawner.spawn(this.ground, 3);
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
