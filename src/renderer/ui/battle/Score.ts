import { UserInterface } from '@/renderer/ui/UserInterface';

export class Score extends UserInterface {

  private score: number = 0;

  public createElement(): HTMLElement {
    const element = document.createElement('div');
    element.setAttribute('id', 'score');
    this.score = 0;
    element.innerHTML = 'Score: ' + this.score;

    return element;
  }

  public update(score: number): void {
    const scoreElement = document.querySelector<HTMLDivElement>('#score')!;
    if (score == -1) {
      this.score = 0;
    } else {
      this.score += score;
    }
    scoreElement.innerHTML = 'Score: ' + this.score;
  }

}
