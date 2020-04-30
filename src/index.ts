import "./styles.scss";
import Game from "./Game";
declare global {
  interface Window {
    requestAnimationFrame: any;
  }
}

function initGame(): void {
  new Game();
}

initGame();
