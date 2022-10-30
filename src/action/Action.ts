import { BattleEventManager } from '@/event/battle/BattleEventManger';
import { BattleUserInterfaceRoot } from '@/renderer/ui/battle/BattleUserInterfaceRoot';

export abstract class Action<T> {

  protected readonly battleEventManager: BattleEventManager;
  protected readonly uiRoot: BattleUserInterfaceRoot;
  
  public actionKeys: T[] = [];

  public constructor(battleEventManager: BattleEventManager, uiRoot: BattleUserInterfaceRoot) {
    this.battleEventManager = battleEventManager;
    this.uiRoot = uiRoot;
  }

  public loadKeys(keys: T[]) {
    this.actionKeys.push(...keys);
    return this;
  }

  public unloadKeys(keys: T[]) {
    this.actionKeys = this.actionKeys.filter(key => !keys.includes(key));
    return this;
  }

  abstract execute(...args: any[]): void;

  abstract unExecute(...args: any[]): void;

}
