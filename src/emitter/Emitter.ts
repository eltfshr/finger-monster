import { Action } from '@/action/Action';

export interface Emitter<T> {

  actionByKey: Map<T, Action<T>>;

  attach(actions: Action<T>[]): void;

  detach(action: Action<T>[]): void;

  init(): void;

  getCurrentKey(): string;

}
