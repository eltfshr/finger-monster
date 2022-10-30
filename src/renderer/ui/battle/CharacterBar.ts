import { UserInterface } from '@/renderer/ui/UserInterface';

export class CharacterBar extends UserInterface {

  public createElement(): HTMLElement {
    const bar = document.createElement('div');
    bar.setAttribute('id', 'character-box-border');

    const indicator = document.createElement('div');
    indicator.setAttribute('id', 'character-box');

    bar.appendChild(indicator);

    return bar;
  }

  public update(character: string): void {
    const characterBox = document.querySelector<HTMLDivElement>('#character-box')!;
    characterBox.innerHTML = character.toUpperCase();
  }

}
