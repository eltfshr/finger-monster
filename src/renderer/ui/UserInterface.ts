export abstract class UserInterface {

  protected readonly node: HTMLElement;

  public constructor() {
    this.node = this.createElement();
  }

  public abstract createElement(): HTMLElement;

  public getNode(): HTMLElement {
    return this.node;
  }

}
