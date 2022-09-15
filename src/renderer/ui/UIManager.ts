export abstract class UIManager {
  protected ui: HTMLDivElement;

  public constructor() {
    this.ui = document.querySelector<HTMLDivElement>('#ui')!;
  }

  public clear(): void {
    this.ui.replaceChildren();
  }

}
