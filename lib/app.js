const Grids = require("./grids");
const Board = require("./board");
const Warrior = require("./warrior");
const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const squareW = 40;
  const squareH = 40;

  const framesPerSecond = 60;

  const boardGrid = Grids.levelOne();

  const board = new Board(ctx, squareW, squareH, boardGrid);

  const game = new Game(ctx, board);

  const update = () => {
    game.moveObjects();
    game.render();
  };

  document.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 37:
        game.move(Warrior.MOVES.left);
        game.warrior.dir = "left";
        break;
      case 38:
        game.move(Warrior.MOVES.up);
        game.warrior.dir = "up";
        break;
        case 39:
        game.move(Warrior.MOVES.right);
        game.warrior.dir = "right";
        break;
        case 40:
        game.move(Warrior.MOVES.down);
        game.warrior.dir = "down";
        break;
      case 32: 
        game.fire(game.warrior.dir);
        break;
    }
  });
  setInterval(update, 1000 / framesPerSecond);
});
