export abstract class UIManager {

  protected readonly ui: HTMLDivElement = document.querySelector<HTMLDivElement>('#ui')!;

  public clear(): void {
    this.ui.replaceChildren();
  }

}
