import { UserInterface } from '@/renderer/ui/UserInterface';

export class BattleManaBar extends UserInterface {

  private static readonly MARGIN_MAX = -8;
  private static readonly MARGIN_MIN = -97;
  private static readonly MARGIN_SCALE = (this.MARGIN_MIN - this.MARGIN_MAX) / 100;

  public createElement(): HTMLElement {
    const bar = document.createElement('div');
    bar.setAttribute('id', 'mana-bar');

    const indicator = document.createElement('div');
    indicator.setAttribute('id', 'mana-bar-indicator');

    const subIndicator = document.createElement('div');
    subIndicator.setAttribute('id', 'mana-bar-sub-indicator');

    bar.appendChild(indicator);
    bar.appendChild(subIndicator);

    return bar;
  }

  public update(health: number): void {
    const indicator = document.querySelector<HTMLDivElement>('#mana-bar-indicator')!;
    const subIndicator = document.querySelector<HTMLDivElement>('#mana-bar-sub-indicator')!;

    const calculatedMargin = BattleManaBar.MARGIN_MIN - BattleManaBar.MARGIN_SCALE * health;
    indicator.style.marginLeft = calculatedMargin + '%';
    subIndicator.style.marginLeft = calculatedMargin + '%';
  }

}
