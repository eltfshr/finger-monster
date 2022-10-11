export class GameScreen {

  private gameDiv: HTMLDivElement;
  private width: number = 0;
  private height: number = 0;

  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.gameDiv = document.querySelector<HTMLDivElement>('#game')!;
    this.gameDiv.style.width = width + 'px';
    this.gameDiv.style.height = height + 'px';
  }

  public getWidth(): number {
    return this.width;
  }

  public setWidth(width: number): void {
    this.width = width;
  }

  public getHeight(): number {
    return this.height;
  }

  public setHeight(height: number): void {
    this.height = height;
  }

}
