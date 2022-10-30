import { Action } from '@/action/Action';
import { Emitter } from '@/emitter/Emitter';

export class KeyboardEmitter implements Emitter<string> {

  public readonly actionByKey: Map<string, Action<string>> = new Map();

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

  public init(): void {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      const action = this.actionByKey.get(event.key);
      if (action) {
        action.execute(event.key);
      }
    });

    window.addEventListener('keyup', (event: KeyboardEvent) => {
      const action = this.actionByKey.get(event.key);
      if (action) {
        action.unExecute(event.key);
      }
    });
  }

}
