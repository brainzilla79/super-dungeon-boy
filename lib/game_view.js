class GameView {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
    this.framesPerSecond = 60;
    this.update = this.update.bind(this);
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
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
  }

  update() {
    // console.log(this.game);
    this.game.moveObjects();
    this.game.render();
  }

  start() {
    this.bindKeyHandlers();
    setInterval(this.update, 1000 / this.framesPerSecond);
  }
}

GameView.MOVES = {
  up: [0, -3],
  left: [-3, 0],
  down: [0, 3],
  right: [3, 0]
};

module.exports = GameView;
