import '@/css/style.css';
import { Game } from '@/Game';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div id="ui"></div>
  <canvas id="scene"></canvas>
`;

const game = new Game();
game.start();
