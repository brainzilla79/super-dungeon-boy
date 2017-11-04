const Game = require("./game");

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = undefined;
    this.framesPerSecond = 60;
    this.menuSong = document.getElementById("menuSong");
    this.sounds = document.querySelectorAll("audio");
    this.soundToggle = document.getElementById("soundToggle");
    this.update = this.update.bind(this);
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
    this.soundHandler = this.soundHandler.bind(this);
    this.restart = this.restart.bind(this);
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 37:
          this.game.move(GameView.MOVES.left);
          this.game.warrior.animate(160, "left");
          break;
        case 38:
          this.game.move(GameView.MOVES.up);
          this.game.warrior.animate(80, "up");
          break;
        case 39:
          this.game.move(GameView.MOVES.right);
          this.game.warrior.animate(240, "right");
          break;
        case 40:
          this.game.move(GameView.MOVES.down);
          this.game.warrior.animate(0, "down");
          break;
        case 32:
          this.game.fire(this.game.warrior.dir);
          break;
      }
    });
    this.soundToggle.addEventListener("change", this.soundHandler);
    document.getElementById("restartBtn").addEventListener("click", this.restart);
  }

  restart() {
    document.getElementById("gameOverScreen").classList.add("hide");
    this.play();
  }

  soundHandler() {
    this.sounds.forEach( sound => {
      this.soundToggle.checked === true ? sound.muted = true : sound.muted = false;
    });
  }

  update() {
    this.game.moveObjects();
    this.game.render();
  }

  start() {
    this.bindKeyHandlers();
    this.menuSong.loop = true;
    this.menuSong.volume = 0.5;
    this.menuSong.play();
    const splashScreen = document.getElementById("splashScreen");
    const playButton = document.getElementById("playButton");
    playButton.addEventListener("click", () => {
      splashScreen.classList.add("hide");
      this.menuSong.pause();
      this.play();
    });
  }

  play() {
    this.game = new Game(this.ctx);
    this.game.intervalId = setInterval(this.update, 1000 / this.framesPerSecond);
  }
}

GameView.MOVES = {
  up: [0, -3],
  left: [-3, 0],
  down: [0, 3],
  right: [3, 0]
};

module.exports = GameView;
