import maps from './maps';
import Loader from './common';

class SinglePlayer {
    currentLevel = 0;
    start = (game: any) => {
        this.currentLevel = 0;
        game.type = "singleplayer";
        game.team = "blue";
        // Finally start the level
        this.startCurrentLevel(game);
    }
    exit = () => {

    }
    startCurrentLevel = (game: any) => {
        var level = maps.singleplayer[this.currentLevel];
        const loader = new Loader();
        game.currentMapImage = loader.loadImage(level.mapImage);
        game.currentLevel = level;
        console.log("start current level");
    }
}
export default SinglePlayer;