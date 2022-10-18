import { UserInterface } from '@/renderer/ui/UserInterface';

export class BattleHealthBar extends UserInterface {

  private static readonly MARGIN_MAX = 5;
  private static readonly MARGIN_MIN = -85;
  private static readonly MARGIN_SCALE = (this.MARGIN_MIN - this.MARGIN_MAX) / 100;

  public createElement(): HTMLElement {
    const bar = document.createElement('div');
    bar.setAttribute('id', 'health-bar');

    const indicator = document.createElement('div');
    indicator.setAttribute('id', 'health-bar-indicator');

    const subIndicator = document.createElement('div');
    subIndicator.setAttribute('id', 'health-bar-sub-indicator');

    bar.appendChild(indicator);
    bar.appendChild(subIndicator);

    return bar;
  }

  public update(health: number): void {
    const indicator = document.querySelector<HTMLDivElement>('#health-bar-indicator')!;
    const subIndicator = document.querySelector<HTMLDivElement>('#health-bar-sub-indicator')!;

    const calculatedMargin = BattleHealthBar.MARGIN_MIN - BattleHealthBar.MARGIN_SCALE * health;
    indicator.style.marginLeft = calculatedMargin + '%';
    subIndicator.style.marginLeft = calculatedMargin + '%';
  }

}
