import SinglePlayer from "./SinglePlayer";
import Mouse from "./Mouse";

class Game {
  backgroundCanvas: HTMLCanvasElement;
  backgroundContext: CanvasRenderingContext2D;
  foregroundCanvas: HTMLCanvasElement;
  foregroundContext: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  running = false;
  refreshBackground = false;
  animationTimeout = 100;
  offset: { x: number; y: number } = { x: 0, y: 0 };
  currentMapImage: any;
  animationInterval: NodeJS.Timeout;
  mouse: Mouse;
  type: string;
  team: string;
  panningThreshold: number = 60;
  panningSpeed: number = 10;
  constructor() {
    console.log("hello game");
    this.backgroundCanvas = <HTMLCanvasElement>(
      document.getElementById("gamebackgroundcanvas")
    );
    this.backgroundContext = this.backgroundCanvas.getContext("2d");
    this.foregroundCanvas = <HTMLCanvasElement>(
      document.getElementById("gameforegroundcanvas")
    );
    this.foregroundContext = this.foregroundCanvas.getContext("2d");
    this.canvasWidth = this.backgroundCanvas.width;
    this.canvasHeight = this.backgroundCanvas.height;

    const singleplayer = new SinglePlayer(this);
    singleplayer.start();
    this.mouse = new Mouse(this);
  }

  start = () => {
    this.running = true;
    this.refreshBackground = true;
    this.drawingLoop();
  };

  animationLoop = () => {
    console.log("animate");
  };

  handlePanning = () => {
    this.mouse.handlePanning();
  };

  drawingLoop = () => {
    this.handlePanning();
    this.foregroundContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    if (this.refreshBackground) {
      this.backgroundContext.clearRect(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      this.backgroundContext.drawImage(
        this.currentMapImage,
        this.offset.x,
        this.offset.y,
        this.canvasWidth,
        this.canvasHeight,
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );
      this.refreshBackground = false;
    }
    this.mouse.draw();
    if (this.running) {
      requestAnimationFrame(this.drawingLoop);
    }
  };
}

export default Game;
