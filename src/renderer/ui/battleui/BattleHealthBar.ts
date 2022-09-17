export class BattleHealthBar {

  private readonly ui: HTMLDivElement
  private readonly healthBar: HTMLDivElement;

  private health: number = 100;

  public constructor(ui: HTMLDivElement) {
    this.ui = ui;

    this.healthBar = document.createElement('div');
    this.healthBar.setAttribute('id', 'health-bar');
    this.healthBar.style.width = (this.ui.offsetWidth / 52) + 'px';

    this.ui.appendChild(this.healthBar);
  }
  
  private draw(): void {
    this.healthBar.style.height = (this.ui.offsetHeight / 4 * this.health / 100) + 'px';
  }

  public updateHealth(health: number): void {
    this.health = health;
    this.draw();
  }
}
