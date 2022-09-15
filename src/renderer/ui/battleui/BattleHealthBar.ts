export class BattleHealthBar {
  private ui: HTMLDivElement;
  private health: number = 100;
  private healthBar!: HTMLDivElement;
  private style: string = 'position: fixed; bottom: 5%; left: 2%; background-color: orangered;';

  public constructor(ui: HTMLDivElement) {
    this.ui = ui;
  }

  public init(): void {
    this.healthBar = document.createElement('div');
    this.healthBar.setAttribute('id', 'health-bar');
    this.ui.appendChild(this.healthBar);
    this.healthBar.setAttribute('style', this.style);
    this.healthBar.style.width = `${this.ui.offsetWidth / 52}px`;
    this.draw();
  }

  private draw(): void {
    this.healthBar.style.height = `${this.ui.offsetHeight / 4 * this.health / 100}px`;
  }

  public updateHealth(health: number): void {
    this.health = health;
    this.draw();
  }
}
