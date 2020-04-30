import Game from "./Game";

class Mouse {
  buttonPressed = false;
  dragSelect = false;
  insideCanvas = false;
  x: number = 0;
  y: number = 0;
  game: { x: number; y: number } = { x: 0, y: 0 };
  drag: { x: number; y: number } = { x: 0, y: 0 };
  theGame: Game;
  constructor(theGame: Game) {
    this.theGame = theGame;
    this.init();
  }
  init = () => {
    const mouseCanvas = this.theGame.foregroundCanvas;
    mouseCanvas.onmousemove = (ev) => {
      this.x = ev.pageX - mouseCanvas.offsetLeft;
      this.y = ev.pageY - mouseCanvas.offsetTop;
      this.calculateGameCoordinates();
      if (this.buttonPressed) {
        if (
          Math.abs(this.drag.x - this.game.x) > 4 ||
          Math.abs(this.drag.y - this.game.y) > 4
        ) {
          this.dragSelect = true;
        }
      } else {
        this.dragSelect = false;
      }
    };
    mouseCanvas.onclick = (ev) => {
      this.click(ev);
      this.dragSelect = false;
      return false;
    };
    mouseCanvas.onmousedown = (ev) => {
      if (ev.which == 1) {
        this.buttonPressed = true;
        this.drag.x = this.game.x;
        this.drag.y = this.game.y;
        ev.preventDefault();
      }
      return false;
    };
    mouseCanvas.addEventListener("contextmenu", (ev: MouseEvent) => {
      this.click(ev, true);
      ev.preventDefault();
      return false;
    });

    mouseCanvas.onmouseup = (ev) => {
      var shiftPressed = ev.shiftKey;
      if (ev.which == 1) {
        this.buttonPressed = false;
        this.dragSelect = false;
      }
      return false;
    };
    mouseCanvas.onmouseleave = (ev) => {
      this.insideCanvas = false;
    };
    mouseCanvas.onmouseenter = (ev) => {
      this.buttonPressed = false;
      this.insideCanvas = true;
    };
  };
  click = (ev: MouseEvent, rightClick = false) => {
    console.log("clicked right?", rightClick);
  };
  draw = () => {
    if (this.dragSelect) {
      const x = Math.min(this.game.x, this.drag.x);
      const y = Math.min(this.game.y, this.drag.y);
      const width = Math.abs(this.game.x - this.drag.x);
      const height = Math.abs(this.game.y - this.drag.y);
      this.theGame.foregroundContext.strokeStyle = "white";
      this.theGame.foregroundContext.strokeRect(
        x - this.theGame.offset.x,
        y - this.theGame.offset.y,
        width,
        height
      );
    }
  };
  calculateGameCoordinates = () => {
    this.game.x = this.x + this.theGame.offset.x;
    this.game.y = this.y + this.theGame.offset.y;
    // this.gridX = Math.floor(this.game.x / this.game.gridSize);
    // this.gridY = Math.floor(this.game.y / this.game.gridSize);
  };
  handlePanning = () => {
    if (!this.insideCanvas) {
      return;
    }
    if (this.x <= this.theGame.panningThreshold) {
      if (this.theGame.offset.x >= this.theGame.panningSpeed) {
        this.theGame.refreshBackground = true;
        this.theGame.offset.x -= this.theGame.panningSpeed;
      }
    } else if (
      this.x >=
      this.theGame.canvasWidth - this.theGame.panningThreshold
    ) {
      if (
        this.theGame.offset.x +
          this.theGame.canvasWidth +
          this.theGame.panningSpeed <=
        this.theGame.currentMapImage.width
      ) {
        this.theGame.refreshBackground = true;
        this.theGame.offset.x += this.theGame.panningSpeed;
      }
    }
    if (this.y <= this.theGame.panningThreshold) {
      if (this.theGame.offset.y >= this.theGame.panningSpeed) {
        this.theGame.refreshBackground = true;
        this.theGame.offset.y -= this.theGame.panningSpeed;
      }
    } else if (
      this.y >=
      this.theGame.canvasHeight - this.theGame.panningThreshold
    ) {
      if (
        this.theGame.offset.y +
          this.theGame.canvasHeight +
          this.theGame.panningSpeed <=
        this.theGame.currentMapImage.height
      ) {
        this.theGame.refreshBackground = true;
        this.theGame.offset.y += this.theGame.panningSpeed;
      }
    }
    if (this.theGame.refreshBackground) {
      // Update mouse game coordinates based on game offsets
      this.calculateGameCoordinates();
    }
  };
}

export default Mouse;
