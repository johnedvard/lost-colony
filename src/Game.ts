import SinglePlayer from './SinglePlayer';

class Game {
    constructor() {
        console.log("hello game");
        const singleplayer = new SinglePlayer();
        singleplayer.start(this);
    }
}

export default Game;