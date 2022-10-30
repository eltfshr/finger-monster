import { Action } from '@/action/Action';

export class CharacterAttackAction<T> extends Action<T> {

  public execute(...args: string[]) {
    console.log('attack with character', args[0]);
    this.battleEventManager.onPlayerAttack();
    this.uiRoot.updateCharacter(args[0]);
  }

  public unExecute(...args: string[]) {
    
  }
  
}
