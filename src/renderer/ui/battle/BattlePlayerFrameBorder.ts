import { UserInterface } from '@/renderer/ui/UserInterface';

export class BattlePlayerFrameBorder extends UserInterface {

  public createElement(): HTMLElement {
    const element = document.createElement('div');
    element.setAttribute('id', 'player-frame-border');
    return element;
  }

}
