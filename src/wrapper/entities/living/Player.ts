import { Arrow } from "@/wrapper/entities/Arrow";
import { Creature } from "@/wrapper/entities/Creature";
import { EntityState } from "@/wrapper/entities/EntityState";
import { Projectile } from "@/wrapper/entities/Projectile";

export class Player extends Creature {
  
  private mana: number = 100;
  private casting: boolean = false;

  public idle(): void {
    this.setCurrentState(EntityState.IDLE);
  }

  public move(): void {
    this.setCurrentState(EntityState.MOVE);
  }

  public updatePosition(): void {}

  public attack(): Projectile {
    const previousState = this.getCurrentState();
    this.setCurrentTemporaryState(EntityState.ATTACK, previousState);

    return new Arrow().setAttackFrame(
      this.animation!.getCurrentSprite().getMetaData("attack-frame")
    );
  }

  public hurt(): void {
    const previousState = this.getCurrentState();
    this.setCurrentTemporaryState(EntityState.HURT, previousState);
  }

  public die(): void {
    this.setCurrentState(EntityState.DIE);
    this.getCurrentSprite().setStopLastFrame(true);
  }

  public getMana(): number {
    return this.mana;
  }

  public setMana(mana: number): void {
    this.mana = mana;
  }

  public isCasting(): boolean {
    return this.casting;
  }

  public setCasting(casting: boolean): void {
    this.casting = casting;
  }

}
