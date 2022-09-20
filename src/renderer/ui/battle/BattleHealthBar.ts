import { UserInterface } from '@/renderer/ui/UserInterface';

export class BattleHealthBar extends UserInterface {

  private health: number = 0;

  public constructor(health: number) {
    super('health-bar');
    this.update(health);
  }

  public update(health: number): void {
    this.health = health;
  }

}
