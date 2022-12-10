import { UserInterface } from '@/renderer/ui/UserInterface';

export class CameraCanvas extends UserInterface {

  public createElement(): HTMLElement {
    const border = document.createElement('div');
    border.setAttribute('id', 'camera-box-border');

    const background = document.createElement('div');
    background.setAttribute('id', 'camera-box-background')

    const video = document.createElement('video');
    video.setAttribute('id', 'camera-box');
    video.setAttribute('autoplay', 'true');

    background.appendChild(video)
    border.appendChild(background);

    return border;
  }

  public update(character: string): void {
    const characterBox = document.querySelector<HTMLDivElement>('#camera-box')!;
    characterBox.innerHTML = character.toUpperCase();
  }

}
