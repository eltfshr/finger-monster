import { Action } from '@/action/Action';
import { Emitter } from '@/emitter/Emitter';

export class KeyboardEmitter implements Emitter<string> {

  public readonly actionByKey: Map<string, Action<string>> = new Map();

  private currentKey: string = '';

  public attach(actions: Action<string>[]): void {
    actions.forEach((action) => {
      action.actionKeys.forEach((key) => {
        this.actionByKey.set(key, action);
      });
    });
  }

  public detach(actions: Action<string>[]): void {
    actions.forEach((action) => {
      action.actionKeys.forEach((key) => {
        this.actionByKey.delete(key);
      });
    });
  }

  public async init(): Promise<void> {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      const action = this.actionByKey.get(event.key);
      this.currentKey = event.key;
      if (action) {
        action.execute(event.key);
      }
    });

    window.addEventListener('keyup', (event: KeyboardEvent) => {
      const action = this.actionByKey.get(event.key);
      this.currentKey = '';
      if (action) {
        action.unExecute(event.key);
      }
    });
  }

  public getCurrentKey(): string {
    return this.currentKey;
  }

}
