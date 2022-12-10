import { UserInterface } from '@/renderer/ui/UserInterface';

export class CameraCanvas extends UserInterface {

  public createElement(): HTMLElement {
    const bar = document.createElement('div');
    bar.setAttribute('id', 'camera-box-border');

    const indicator = document.createElement('video');
    indicator.setAttribute('id', 'camera-box');
    indicator.setAttribute('autoplay', 'true');

    bar.appendChild(indicator);

    return bar;
  }

  public update(character: string): void {
    const characterBox = document.querySelector<HTMLDivElement>('#camera-box')!;
    characterBox.innerHTML = character.toUpperCase();
  }

}
