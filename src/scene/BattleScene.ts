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
  GAMEOVER,
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
    "f",
    "h",
    "i",
    "k",
    "l",
    "o",
    "q",
    "s",
    "t",
    "u",
    "v",
    "w",
    "y",
  ];
  private targetKey: string = this.keys[Math.floor(Math.random() * this.keys.length)];
  private firstAlphabet = new AudioResource(
    `audio/alphabet/${this.targetKey}.mp3`
  );

  private correctKeyCount: number = 0;

  private phase: BattleScenePhase = BattleScenePhase.START;
  private relativeVelocity: number = 1.0;

  private readonly BASE_SPAWN_RATE: number = 0.55;
  private readonly waves: Map<number, Wave> = new Map([
    [1, new Wave(450, 500, 9000)],
    [2, new Wave(1500, 1500, 1500)],
    [3, new Wave(400, 450, 9000)],
    [4, new Wave(1500, 1500, 1500)],
    [5, new Wave(350, 400, 7200)],
    [6, new Wave(1500, 1500, 1500)],
    [7, new Wave(300, 350, 7200)],
    [8, new Wave(1500, 1500, 1500)],
    [9, new Wave(250, 300, 5400)],
    [10, new Wave(1500, 1500, 1500)],
    [11, new Wave(200, 250, 5400)],
    [12, new Wave(1500, 1500, 1500)],
    [13, new Wave(150, 200, 3600)],
    [14, new Wave(1500, 1500, 1500)],
    [15, new Wave(100, 150, 3600)],
    [16, new Wave(1500, 1500, 1500)],
    [17, new Wave(50, 100, 1800)],
    [18, new Wave(1500, 1500, 1500)],
    [19, new Wave(10, 50, 1800)],
  ]);
  private currentWaveNumber: number = 1;
  private nextSpawnFrame: number = 100;
  private nextWaveFrame: number = this.waves.get(1)!.getFrameAmount();

  public async load(): Promise<void> {
    await Promise.all([this.imageRegistry.load(), this.backgroundAudio.load()]);

    this.backgroundAudio.setVolume(0.01);
    this.backgroundAudio.play();

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

    // this.keyboardEmitter.attach([
    //   new CharacterAttackAction<string>(this.eventManager, this.uiRoot)
    //     .loadKeys(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']),
    //   new RunAction<string>(this.eventManager, this.uiRoot).loadKeys([
    //     "ArrowRight",
    //     "ArrowLeft",
    //   ]),

    //   new JumpAction<string>(this.eventManager, this.uiRoot).loadKeys([" "]),
    // ]);

    this.cameraEmitter.attach();

    await this.keyboardEmitter.init();
    await this.cameraEmitter.init();

    const loadingOverlay = document.querySelector<HTMLDivElement>('#loading-overlay')!;
    loadingOverlay.style.opacity = '0';
    const loadingUi = document.querySelector<HTMLDivElement>('#loading-ui')!;
    loadingUi.style.display = 'block';
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

    const currentKey = this.keyboardEmitter.getCurrentKey();
    if (currentKey) {
      const playerHuds = document.querySelector<HTMLDivElement>('#player-info-hud')!;
      playerHuds.style.display = 'block';
      const loadingUi = document.querySelector<HTMLDivElement>('#loading-ui')!;
      loadingUi.style.display = 'none';
      this.phase = BattleScenePhase.BATTLE;
      this.sceneFrame = 0;
    }
  }

  private updateOnBattle(): void {
    this.updateAllBackgrounds();
    this.drawEntity(this.player, SpriteDirection.RIGHT);
    this.physicsEngine.gravitate(this.player, this.ground);
    this.eventManager.onPlayerManaChange(0.01);

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

    const key = this.keyboardEmitter.getCurrentKey();
    const currentKey = this.cameraEmitter.getCurrentKey();
    this.uiRoot.updatePlayerCharacter(currentKey);

    if (key == '') {
      this.player.setCasting(false);
    }

    //Get key for shooting
    if (((currentKey == this.targetKey && !this.player.isMoving()) || (key == ' ' && this.player.getMana() >= 30)) && !this.player.isCasting()) {
      this.correctKeyCount++;

      if (this.correctKeyCount == 10 && !this.player.isDieing()) {
        this.player.setCasting(true);
        this.correctKeyCount = 0;
        this.targetKey = this.keys[Math.floor(Math.random() * this.keys.length)];
        let newAlphabet = new AudioResource(
          `audio/alphabet/${this.targetKey}.mp3`
        );
        newAlphabet.load();
        newAlphabet.setLoop(false);
        setTimeout(() => {
          newAlphabet.play();
        }, 500);
        this.eventManager.onCharacterChange(this.targetKey);
        
        if (key != ' ') {
          this.shoot();
          this.eventManager.onPlayerAttack();
          this.eventManager.onSignCorrect(nearEnemy);
        } else {
          this.eventManager.onPlayerManaChange(-30);
        }
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
    const creatureInSpawner = this.creatureSpawner.getSpawnedCreatures();
    creatureInSpawner.forEach((creature) => {
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
      //collide with player to attack
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
      //remove when out of the scene
      if (creature.getRealX() + creature.getRealWidth() < 0) {
        this.creatureSpawner.removeCreature(creature);
      }
    });

    // Walk if creature not exists in the spawner
    const livingCreatures = creatureInSpawner.filter((creature) => !creature.isDieing());
    if (livingCreatures.length === 1) { // Count placeholder
      !this.player.isMoving() && this.player.move();
    } else {
      this.player.isMoving() && this.player.idle();
    }

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
      this.phase = BattleScenePhase.GAMEOVER;
      const loadingUi = document.querySelector<HTMLDivElement>('#loading-ui')!;
      loadingUi.innerHTML = 'GAMEOVER, Press any key to restart!'
      loadingUi.style.display = 'block';
      
      // Reset
      if (key) {
        this.phase = BattleScenePhase.BATTLE;
        this.player.move();
        this.player.setHealth(100);
        this.player.setMana(100);
        this.sceneFrame = 0;
        this.currentWaveNumber = 1;
        this.nextSpawnFrame = 100;
        this.nextWaveFrame = this.waves.get(1)!.getFrameAmount();
        this.correctKeyCount = 0;
        this.projectiles.splice(0, this.projectiles.length);
        this.creatureSpawner.clearCreatures();
        loadingUi.style.display = 'none';
        this.targetKey = this.keys[Math.floor(Math.random() * this.keys.length)];
        this.firstAlphabet = new AudioResource(
          `audio/alphabet/${this.targetKey}.mp3`
        );
        this.eventManager.onCharacterChange(this.targetKey);
        this.eventManager.onReset();
      }
    }

    //Change wave
    if (this.sceneFrame == this.nextWaveFrame) {
      this.currentWaveNumber = Math.min(this.currentWaveNumber + 1, 19);
      this.eventManager.onWaveChange(this.currentWaveNumber);
      this.nextWaveFrame =
        this.waves.get(this.currentWaveNumber)!.getFrameAmount() +
        this.sceneFrame;
    }

    //Spawn enemies based on frame and wave
    if (this.sceneFrame === this.nextSpawnFrame && !this.player.isDieing()) {
      const wave = this.waves.get(this.currentWaveNumber);
      this.nextSpawnFrame =
        Math.floor(
          Math.random() * (wave!.getMaxFrequency() - wave!.getMinFrequency()) +
            wave!.getMinFrequency()
        ) + this.sceneFrame;

      if (
        Math.random() <
          this.BASE_SPAWN_RATE +
            (this.sceneFrame / 67500) * (1 - this.BASE_SPAWN_RATE) ||
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
