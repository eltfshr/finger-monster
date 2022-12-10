import { JumpAction } from "@/action/JumpAction";
import { RunAction } from "@/action/RunAction";
import { CameraEmitter } from "@/emitter/CameraEmitter";
import { KeyboardEmitter } from "@/emitter/KeyboardEmitter";
import { BattleEventManager } from "@/event/battle/BattleEventManger";
import { AudioResource } from "@/renderer/audio/AudioResource";
import { BattleBackgroundAudio } from "@/renderer/audio/BattleBackgroundAudio";
import { BattleImageRegistry } from "@/renderer/BattleImageRegistry";
import { CollisionRegistry } from "@/renderer/collision/CollisionRegistry";
import { Background } from "@/renderer/object/Background";
import { Ground } from "@/renderer/object/Ground";
import { PhysicsEngine } from "@/renderer/PhysicsEngine";
import { ArrowAnimation } from "@/renderer/sprite/entities/ArrowAnimation";
import { BlueSlimeAnimation } from "@/renderer/sprite/entities/BlueSlimeAnimation";
import { FlyingEyeAnimation } from "@/renderer/sprite/entities/FlyingEyeAnimation";
import { GoblinAnimation } from "@/renderer/sprite/entities/GoblinAnimation";
import { MushroomAnimation } from "@/renderer/sprite/entities/MushroomAnimation";
import { PlayerAnimation } from "@/renderer/sprite/entities/PlayerAnimation";
import { ShieldSkeletonAnimation } from "@/renderer/sprite/entities/ShieldSkeletonAnimation";
import { SkeletonAnimation } from "@/renderer/sprite/entities/SkeletonAnimation";
import { SpriteDirection } from "@/renderer/sprite/SpriteDirection";
import { BattleUserInterfaceRoot } from "@/renderer/ui/battle/BattleUserInterfaceRoot";
import { Scene } from "@/scene/Scene";
import { CreatureSpawner } from "@/wrapper/entities/CreatureSpawner";
import { EntityState } from "@/wrapper/entities/EntityState";
import { HostileCreature } from "@/wrapper/entities/HostileCreature";
import { BlueSlime } from "@/wrapper/entities/living/BlueSlime";
import { FlyingEye } from "@/wrapper/entities/living/FlyingEye";
import { Goblin } from "@/wrapper/entities/living/Goblin";
import { Mushroom } from "@/wrapper/entities/living/Mushroom";
import { Player } from "@/wrapper/entities/living/Player";
import { ShieldSkeleton } from "@/wrapper/entities/living/ShieldSkeleton";
import { Skeleton } from "@/wrapper/entities/living/Skeleton";
import { Projectile } from "@/wrapper/entities/Projectile";
import { Wave } from "@/wrapper/entities/Wave";

export enum BattleScenePhase {
  START,
  BATTLE,
  PAUSE,
}

export class BattleScene extends Scene {
  private readonly imageRegistry = new BattleImageRegistry();
  private readonly collisionRegistry = new CollisionRegistry();

  private readonly baseBackground = new Background(this.imageRegistry);
  private readonly midBackground = new Background(this.imageRegistry);
  private readonly ground = new Ground(this.imageRegistry);

  private readonly backgroundAudio = new BattleBackgroundAudio();

  private readonly creatureSpawner = new CreatureSpawner(
    this.imageRegistry,
    this.collisionRegistry
  );
  private readonly player = new Player();

  private readonly uiRoot = new BattleUserInterfaceRoot(this.player);
  private readonly eventManager = new BattleEventManager(
    this.uiRoot,
    this.player
  );

  private readonly keyboardEmitter = new KeyboardEmitter();
  private readonly cameraEmitter = new CameraEmitter();

  private readonly physicsEngine = new PhysicsEngine();
  private readonly projectiles: Projectile[] = [];

  private readonly keys: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  private targetKey: string = this.keys[Math.floor(Math.random() * 26)];
  private firstAlphabet = new AudioResource(
    `audio/alphabet/${this.targetKey}.mp3`
  );

  private correctKeyCount: number = 0;

  private phase: BattleScenePhase = BattleScenePhase.BATTLE;
  private relativeVelocity: number = 1.0;

  private readonly BASE_SPAWN_RATE: number = 0.55;
  private readonly waves: Map<number, Wave> = new Map([
    [1, new Wave(450, 500, 9000)],
    [2, new Wave(400, 450, 9000)],
    [3, new Wave(350, 400, 7200)],
    [4, new Wave(300, 350, 7200)],
    [5, new Wave(250, 300, 5400)],
    [6, new Wave(200, 250, 5400)],
    [7, new Wave(150, 200, 3600)],
    [8, new Wave(100, 150, 3600)],
    [9, new Wave(50, 100, 1800)],
    [10, new Wave(10, 50, 1800)],
  ]);
  private currentWaveNumber: number = 1;
  private nextSpawnFrame: number = 100;
  private nextWaveFrame: number = this.waves.get(1)!.getFrameAmount();

  public async load(): Promise<void> {
    await Promise.all([this.imageRegistry.load(), this.backgroundAudio.load()]);

    this.backgroundAudio.setVolume(0.25);
    // this.backgroundAudio.play();

    this.baseBackground.setImage("bg/battle/base.png").setScene(this);
    this.midBackground.setImage("bg/battle/mid.png").setScene(this);

    this.ground
      .setImage("tiles/tileset1.png")
      .setSize(16)
      .setScene(this)
      .apply(this.getHeight() * 0.2, 2)
      .init();

    this.creatureSpawner
      .setScene(this)
      .addCreature(BlueSlime, BlueSlimeAnimation)
      .addCreature(Mushroom, MushroomAnimation)
      .addCreature(FlyingEye, FlyingEyeAnimation)
      .addCreature(Skeleton, SkeletonAnimation)
      .addCreature(ShieldSkeleton, ShieldSkeletonAnimation)
      .addCreature(Goblin, GoblinAnimation);

    this.player.setAnimation(
      new PlayerAnimation(this.imageRegistry, this.collisionRegistry)
    );
    this.player.setScale(1.25);
    this.player.setX(this.getWidth() / 9);
    // this.player.setY(0);
    this.player.setYOnGround(this.ground);
    this.player.idle();

    this.eventManager.onCharacterChange(this.targetKey);

    this.keyboardEmitter.attach([
      // new CharacterAttackAction<string>(this.eventManager, this.uiRoot)
      //   .loadKeys(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']),
      new RunAction<string>(this.eventManager, this.uiRoot).loadKeys([
        "ArrowRight",
        "ArrowLeft",
      ]),

      new JumpAction<string>(this.eventManager, this.uiRoot).loadKeys([" "]),
    ]);

    this.cameraEmitter.attach();

    await this.keyboardEmitter.init();
    await this.cameraEmitter.init();
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

    //Find one nearest enemy for target
    const nearEnemy = this.physicsEngine.getNearestCreature(
      this.player,
      this.creatureSpawner.getSpawnedCreatures()
    );

    //Draw red indicator on top of nearest enemy
    const nearEnermyX =
      nearEnemy.getCurrentSprite().getDirection() == SpriteDirection.LEFT
        ? nearEnemy.getRealX() + nearEnemy.getRealWidth() / 3 - 10
        : nearEnemy.getX() +
          (nearEnemy.getX() +
            nearEnemy.getCurrentSprite().getWidth() * nearEnemy.getScale()) -
          (nearEnemy.getRealX() + (nearEnemy.getRealWidth() / 3) * 2 + 10);

    this.eventManager.onTargetMove(nearEnermyX, nearEnemy.getRealY() - 30 - 5);

    // const currentKey = this.keyboardEmitter.getCurrentKey();
    const currentKey = this.cameraEmitter.getCurrentKey();
    this.uiRoot.updatePlayerCharacter(currentKey);

    //Get key for shooting
    if (currentKey == this.targetKey) {
      this.correctKeyCount++;

      if (this.correctKeyCount == 10) {
        this.correctKeyCount = 0;
        this.shoot();
        this.eventManager.onPlayerAttack();
        this.targetKey = this.keys[Math.floor(Math.random() * 26)];
        let newAlphabet = new AudioResource(
          `audio/alphabet/${this.targetKey}.mp3`
        );
        newAlphabet.load();
        newAlphabet.setLoop(false);
        setTimeout(() => {
          newAlphabet.play();
        }, 500);
        this.eventManager.onCharacterChange(this.targetKey);
      }
    }

    //Shooting projectiles and hurting enemies
    this.projectiles
      .slice()
      .reverse()
      .forEach((projectile, index, array) => {
        projectile.nextFrameCount();

        if (
          projectile.getFrameCount() <
          projectile.getAttackFrame() *
            this.player.getAnimation().getCurrentSprite().getFrameHold()
        ) {
          return;
        } else if (
          projectile.getFrameCount() ==
          projectile.getAttackFrame() *
            this.player.getAnimation().getCurrentSprite().getFrameHold()
        ) {
          projectile.setTarget(nearEnemy!);
          projectile.setX(this.player.getRealX() + this.player.getRealWidth());
          projectile.setY(
            this.player.getRealY() + this.player.getRealHeight() / 2
          );
        }

        this.drawEntity(projectile, SpriteDirection.RIGHT);

        const isProjectileHit = this.physicsEngine.projectileMotion(
          projectile,
          projectile.getTarget(),
          this.ground
        );
        if (isProjectileHit) {
          if (projectile.isCollide(projectile.getTarget())) {
            this.eventManager.onEnemyHurt(projectile.getTarget());
          }
          this.projectiles.splice(array.length - 1 - index, 1);
        }
      });

    //Moving enemies and attacking
    this.creatureSpawner.getSpawnedCreatures().forEach((creature) => {
      // !creature.isAttacking() && creature.attack();
      if (
        creature.getCurrentState() === EntityState.MOVE ||
        creature.isDieing()
      ) {
        !this.player.isMoving() &&
          !creature.isDieing() &&
          creature.setX(
            creature.getX() -
              1.3 *
                this.relativeVelocity *
                (creature as HostileCreature).getSpeedMultiplier()
          );
        this.player.isMoving() &&
          !creature.isDieing() &&
          creature.setX(
            creature.getX() -
              1.3 *
                this.relativeVelocity *
                1.3 *
                (creature as HostileCreature).getSpeedMultiplier()
          );
        this.player.isMoving() &&
          creature.setX(creature.getX() - this.relativeVelocity);
      }

      creature.setYOnGround(this.ground);
      this.drawEntity(creature, SpriteDirection.LEFT);

      if (
        this.player.getCurrentState() !== EntityState.DIE &&
        !creature.isDieing() &&
        creature.isCollide(this.player)
      ) {
        if (!creature.isAttacking()) {
          this.eventManager.onEnemyAttack(creature);
        }

        if (
          creature.getCurrentSprite().getCurrentFrame() ==
          creature.getCurrentSprite().getMetaData("attack-frame")
        ) {
          this.eventManager.onPlayerHurt(
            (creature as HostileCreature).getDamage() /
              creature.getCurrentSprite().getFrameHold()
          );
        }
      }
    });

    //audio first alphabet
    if (this.sceneFrame === 50) {
      this.firstAlphabet.load();
      this.firstAlphabet.setLoop(false);
      this.firstAlphabet.play();
    }

    //Stop enemies when player dies
    if (this.player.isDieing()) {
      this.creatureSpawner.getSpawnedCreatures().forEach((creature) => {
        if (!creature.isIdle() && !creature.isDieing()) {
          creature.idle();
        }
      });
    }

    //Change wave
    if (this.sceneFrame == this.nextWaveFrame) {
      this.currentWaveNumber = Math.min(this.currentWaveNumber + 1, 10);
      this.nextWaveFrame =
        this.waves.get(this.currentWaveNumber)!.getFrameAmount() +
        this.sceneFrame;
    }

    //Spawn enemies based on frame and wave
    if (this.sceneFrame === this.nextSpawnFrame) {
      const wave = this.waves.get(this.currentWaveNumber);
      this.nextSpawnFrame =
        Math.floor(
          Math.random() * (wave!.getMaxFrequency() - wave!.getMinFrequency()) +
            wave!.getMinFrequency()
        ) + this.sceneFrame;

      if (
        Math.random() <
          this.BASE_SPAWN_RATE +
            (this.sceneFrame / 54000) * (1 - this.BASE_SPAWN_RATE) ||
        this.sceneFrame == 100
      ) {
        const spawnedCreature = this.creatureSpawner.randomlySpawn(this.ground);
        spawnedCreature.move();
      }
    }
  }

  private updateAllBackgrounds(): void {
    if (this.player.isMoving() && this.sceneFrame % 3 === 0) {
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
    arrow.setAnimation(
      new ArrowAnimation(this.imageRegistry, this.collisionRegistry)
    );
    this.projectiles.push(arrow);
  }
}
