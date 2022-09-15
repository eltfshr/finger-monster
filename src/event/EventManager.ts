import { UIManager } from '@/renderer/ui/UIManager';

export abstract class EventManager {
  protected abstract uiManager: UIManager;  

  public constructor() {}
}
