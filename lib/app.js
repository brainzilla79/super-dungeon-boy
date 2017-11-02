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
        game.warrior.imgY = 160;
        game.warrior.dir = "left";
        game.warrior.sprite.update(ctx, game.warrior.pos);
        break;
        case 38:
        game.move(Warrior.MOVES.up);
        game.warrior.imgY = 80;
        game.warrior.dir = "up";
        game.warrior.sprite.update(ctx, game.warrior.pos);
        break;
        case 39:
        game.move(Warrior.MOVES.right);
        game.warrior.imgY = 240;
        game.warrior.dir = "right";
        game.warrior.sprite.update(ctx, game.warrior.pos);
        break;
        case 40:
        game.move(Warrior.MOVES.down);
        game.warrior.imgY = 0;
        game.warrior.dir = "down";
        game.warrior.sprite.update(ctx, game.warrior.pos);
        break;
      case 32: 
        game.fire(game.warrior.dir);
        break;
    }
  });
  setInterval(update, 1000 / framesPerSecond);
});
