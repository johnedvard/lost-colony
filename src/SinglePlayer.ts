import maps from "./maps";
import Loader from "./common";
import Game from "./Game";

class SinglePlayer {
  currentLevel = 0;
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }
  start = () => {
    this.currentLevel = 0;
    this.game.type = "singleplayer";
    this.game.team = "blue";
    // Finally start the level
    this.startCurrentLevel(this.game);
  };
  exit = () => {};
  startCurrentLevel = (game: any) => {
    this.game = game;
    var level = maps.singleplayer[this.currentLevel];
    const loader = new Loader();
    loader.loadImage(level.mapImage).then((image) => {
      game.currentMapImage = image;
      game.currentLevel = level;
      console.log("start current level again, and again", game.currentMapImage);
      this.play();
    });
  };
  play = () => {
    this.game.animationLoop();
    this.game.animationInterval = setInterval(
      this.game.animationLoop,
      this.game.animationTimeout
    );
    this.game.start();
  };
}
export default SinglePlayer;
