import { Action } from '@/action/Action';

export class JumpAction<T> extends Action<T> {

  public execute(...args: string[]) {
    console.log('jumping', args[0]);
    this.battleEventManager.onPlayerJump();
  }

  public unExecute(...args: string[]) {
    // console.log('stop running', args[0]);
    // this.battleEventManager.onPlayerStopMove();
  }
} 
