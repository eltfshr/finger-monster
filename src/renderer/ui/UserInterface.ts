export abstract class UserInterface {

  protected readonly node: HTMLDivElement;

  public constructor(id: string) {
    this.node = document.createElement('div');
    this.node.setAttribute('id', id);
  }

  public getNode(): HTMLDivElement {
    return this.node;
  }

}
