import { UserInterface } from '@/renderer/ui/UserInterface';

export class TargetIndicator extends UserInterface {

  public createElement(): HTMLElement {
    const element = document.createElement('div');
    element.setAttribute('id', 'target-indicator');
    return element;
  }

  public update(x: number, y: number): void {
    const indicator = document.querySelector<HTMLDivElement>('#target-indicator')!;

    indicator.style.top = y + 'px';
    indicator.style.left = x + 'px';
  }

}
