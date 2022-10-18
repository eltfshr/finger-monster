import { UserInterface } from '@/renderer/ui/UserInterface';

export class BattlePlayerFrame extends UserInterface {

  public createElement(): HTMLElement {
    const element = document.createElement('div');
    element.setAttribute('id', 'player-frame');
    return element;
  }

}
