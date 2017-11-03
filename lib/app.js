const Grids = require("./grids");
const Board = require("./board");
const Warrior = require("./warrior");
const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const framesPerSecond = 60;
  const boardGrid = Grids.levelOne();

  const board = new Board(ctx, boardGrid);

  const game = new Game(ctx, board);

  const update = () => {
    game.moveObjects();
    game.render();
  };

  document.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 37:
        game.move(Warrior.MOVES.left);
        game.warrior.animate(160, "left");
        break;
      case 38:
        game.move(Warrior.MOVES.up);
        game.warrior.animate(80, "up");
        break;
      case 39:
        game.move(Warrior.MOVES.right);
        game.warrior.animate(240, "right");
        break;
      case 40:
        game.move(Warrior.MOVES.down);
        game.warrior.animate(0, "down");
        break;
      case 32:
        game.fire(game.warrior.dir);
        break;
    }
  });
  setInterval(update, 1000 / framesPerSecond);
});
