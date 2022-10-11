export abstract class UserInterfaceRoot {

  private readonly root: HTMLDivElement = document.querySelector<HTMLDivElement>('#ui')!;

  public append<T extends Node>(node: T): void {
    this.root.appendChild(node);
  }
    
  public clear(): void {
    this.root.replaceChildren();
  }

}
