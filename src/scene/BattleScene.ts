import { CharacterAttackAction } from '@/action/CharacterAttackAction';
import { JumpAction } from '@/action/JumpAction';
import { RunAction } from '@/action/RunAction';
import { KeyboardEmitter } from '@/emitter/KeyboardEmitter';
import { BattleEventManager } from '@/event/battle/BattleEventManger';
import { BattleBackgroundAudio } from '@/renderer/audio/BattleBackgroundAudio';
import { BattleImageRegistry } from '@/renderer/BattleImageRegistry';
import { CollisionRegistry } from '@/renderer/collision/CollisionRegistry';
import { Background } from '@/renderer/object/Background';
import { Ground } from '@/renderer/object/Ground';
import { PhysicsEngine } from '@/renderer/PhysicsEngine';
import { ArrowAnimation } from '@/renderer/sprite/entities/ArrowAnimation';
import { BlueSlimeAnimation } from '@/renderer/sprite/entities/BlueSlimeAnimation';
import { FlyingEyeAnimation } from '@/renderer/sprite/entities/FlyingEyeAnimation';
import { GoblinAnimation } from '@/renderer/sprite/entities/GoblinAnimation';
import { MushroomAnimation } from '@/renderer/sprite/entities/MushroomAnimation';
import { PlayerAnimation } from '@/renderer/sprite/entities/PlayerAnimation';
import { ShieldSkeletonAnimation } from '@/renderer/sprite/entities/ShieldSkeletonAnimation';
import { SkeletonAnimation } from '@/renderer/sprite/entities/SkeletonAnimation';
import { SpriteDirection } from '@/renderer/sprite/SpriteDirection';
import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';
import { Scene } from '@/scene/Scene';
import { CreatureSpawner } from '@/wrapper/entities/CreatureSpawner';
import { EntityState } from '@/wrapper/entities/EntityState';
import { HostileCreature } from '@/wrapper/entities/HostileCreature';
import { BlueSlime } from '@/wrapper/entities/living/BlueSlime';
import { FlyingEye } from '@/wrapper/entities/living/FlyingEye';
import { Goblin } from '@/wrapper/entities/living/Goblin';
import { Mushroom } from '@/wrapper/entities/living/Mushroom';
import { Player } from '@/wrapper/entities/living/Player';
import { ShieldSkeleton } from '@/wrapper/entities/living/ShieldSkeleton';
import { Skeleton } from '@/wrapper/entities/living/Skeleton';
import { Projectile } from '@/wrapper/entities/Projectile';

export enum BattleScenePhase {
  START,
  BATTLE,
  PAUSE,
}

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
  private readonly eventManager       = new BattleEventManager(this.uiRoot, this.player, this);

  private readonly keyboardEmitter    = new KeyboardEmitter();

  private readonly physicsEngine      = new PhysicsEngine();
  private readonly projectiles: Projectile[] = [];
  
  private phase: BattleScenePhase = BattleScenePhase.BATTLE;
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
    // this.player.setY(0);
    this.player.setYOnGround(this.ground);
    this.player.idle();

    this.keyboardEmitter.attach([
      new CharacterAttackAction<string>(this.eventManager, this.uiRoot)
        .loadKeys(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']),
      new RunAction<string>(this.eventManager, this.uiRoot)
        .loadKeys(['ArrowRight', 'ArrowLeft']),

      new JumpAction<string>(this.eventManager, this.uiRoot)
        .loadKeys([' ']),
    ])

    this.keyboardEmitter.init();
  }

  public update(): void {
    if (this.phase === BattleScenePhase.START) {
      this.updateOnStart();
    } else {
      this.updateOnBattle();
    }
  }

  private updateOnStart(): void {
    this.baseBackground.move(1 * this.relativeVelocity);
    this.midBackground.move(2 * this.relativeVelocity);
    this.ground.move(3 * this.relativeVelocity);
    this.baseBackground.draw(this.getCanvasContext());
    this.midBackground.draw(this.getCanvasContext());
    this.ground.draw(this.getCanvasContext());
  }

  private updateOnBattle(): void {
    this.updateAllBackgrounds();
      this.drawEntity(this.player, SpriteDirection.RIGHT);
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
        
        this.drawEntity(projectile, SpriteDirection.LEFT);
        
        const isProjectileHit = this.physicsEngine.projectileMotion(projectile, projectile.getTarget(), this.ground);
        if (isProjectileHit) {
          if (projectile.isCollide(projectile.getTarget())) {
            this.eventManager.onEnemyHurt(projectile.getTarget())
          }
          this.projectiles.splice(array.length - 1 - index, 1);
        }
      });

      // if (this.sceneFrame === 100 || this.sceneFrame === 200 || this.sceneFrame === 300) {
      //   this.player.idle();
      //   const arrow = this.player.attack();
      //   arrow.setAnimation(new ArrowAnimation(this.imageRegistry, this.collisionRegistry));
      //   this.projectiles.push(arrow);
      //   // this.player.jump();
      // }

      // if (this.sceneFrame % 200 === 0) {
      //   // this.player.idle()
      //   this.player.setHealth(this.player.getHealth() - 10);
      //   this.eventManager.onPlayerHurt(10);
      // }

      // if (this.sceneFrame === 1200) {
      //   this.player.move();
      // }

      // if (this.sceneFrame === 1600) {
      //   this.player.die();
      // }

      this.creatureSpawner.getSpawnedCreatures().forEach((creature) => {
        // !creature.isAttacking() && creature.attack();
        if (creature.getCurrentState() === EntityState.MOVE || creature.isDieing()) {
          !this.player.isMoving() && !creature.isDieing() && creature.setX(creature.getX() - (1.3 * this.relativeVelocity * (creature as HostileCreature).getSpeedMultiplier()));
          this.player.isMoving() && !creature.isDieing() && creature.setX(creature.getX() - (1.3 * this.relativeVelocity * 2 * (creature as HostileCreature).getSpeedMultiplier()));
          this.player.isMoving() && creature.setX(creature.getX() - (this.relativeVelocity));
        }

        creature.setYOnGround(this.ground);
        this.drawEntity(creature, SpriteDirection.LEFT);

        if ((this.player.getCurrentState() !== EntityState.DIE) && !creature.isDieing() && creature.isCollide(this.player)) {
          if (!creature.isAttacking()) {
            this.eventManager.onEnemyAttack(creature);
          }
          
          if (creature.getCurrentSprite().getCurrentFrame() == creature.getCurrentSprite().getMetaData('attack-frame')) {
            this.eventManager.onPlayerHurt((creature as HostileCreature).getDamage() / creature.getCurrentSprite().getFrameHold());
          }

        }
      });

      if (this.player.isDieing()) {
        this.creatureSpawner.getSpawnedCreatures().forEach((creature) => {
          if (!creature.isIdle() && !creature.isDieing()) {
            creature.idle();
          }
        });
      }

      if (this.sceneFrame === 100) {
        const spawnedCreate = this.creatureSpawner.spawn(BlueSlime, BlueSlimeAnimation, this.ground, 3);
        spawnedCreate.move();
      }

      if (this.sceneFrame === 200) {
        const spawnedCreate = this.creatureSpawner.spawn(Mushroom, MushroomAnimation, this.ground, 3);
        spawnedCreate.move();
      }

      if (this.sceneFrame === 300) {
        const spawnedCreate = this.creatureSpawner.spawn(FlyingEye, FlyingEyeAnimation, this.ground, 3);
        spawnedCreate.move();
      }

      if (this.sceneFrame === 400) {
        const spawnedCreate = this.creatureSpawner.spawn(Skeleton, SkeletonAnimation, this.ground, 3);
        spawnedCreate.move();
      }

      if (this.sceneFrame === 500) {
        const spawnedCreate = this.creatureSpawner.spawn(ShieldSkeleton, ShieldSkeletonAnimation, this.ground, 3);
        spawnedCreate.move();
      }

      if (this.sceneFrame === 600) {
        const spawnedCreate = this.creatureSpawner.spawn(Goblin, GoblinAnimation, this.ground, 3);
        spawnedCreate.move();
      }
      // if (this.sceneFrame === 120) {
      //   this.creatureSpawner.spawn(this.ground, 3);
      // }
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

  public shoot(): void {
    this.player.idle();
    const arrow = this.player.attack();
    arrow.setAnimation(new ArrowAnimation(this.imageRegistry, this.collisionRegistry));
    this.projectiles.push(arrow);
  }
  
}
