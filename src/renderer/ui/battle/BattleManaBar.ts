import { UserInterface } from '@/renderer/ui/UserInterface';

export class BattleManaBar extends UserInterface {

  private mana: number = 0;

  public constructor(mana: number) {
    super('mana-bar');
    this.update(mana);
  }

  public update(mana: number): void {
    this.mana = mana;
  }

}
