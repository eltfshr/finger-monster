import { UserInterface } from '@/renderer/ui/UserInterface';

export class WaveNumber extends UserInterface {

  public createElement(): HTMLElement {
    const element = document.createElement('div');
    element.setAttribute('id', 'wave');
    element.innerHTML = 'Wave ' + 1;

    return element;
  }

  public update(wave: number): void {
    const scoreElement = document.querySelector<HTMLDivElement>('#wave')!;
    scoreElement.innerHTML = 'Wave ' + wave;
  }

}