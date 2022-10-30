import { Action } from '@/action/Action';

export class RunAction<T> extends Action<T> {

  public execute(...args: string[]) {
    console.log('running', args[0]);
    this.battleEventManager.onPlayerMove();
  }

  public unExecute(...args: string[]) {
    console.log('stop running', args[0]);
    this.battleEventManager.onPlayerStopMove();
  }
} 
