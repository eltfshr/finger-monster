import { UserInterface } from '@/renderer/ui/UserInterface';

export class PlayerCharacterBar extends UserInterface {

  public createElement(): HTMLElement {
    const bar = document.createElement('div');
    bar.setAttribute('id', 'player-character-box-border');

    const indicator = document.createElement('div');
    indicator.setAttribute('id', 'player-character-box');

    bar.appendChild(indicator);

    return bar;
  }

  public update(character: string): void {
    const characterBox = document.querySelector<HTMLDivElement>('#player-character-box')!;
    characterBox.innerHTML = character.toUpperCase();
  }

}
