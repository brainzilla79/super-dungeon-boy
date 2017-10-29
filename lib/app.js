const Util = require("./util");
const Grids = require("./grids");
const Board = require("./board");
const Warrior = require("./warrior");
const Key = require("./key");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const squareW = 40;
  const squareH = 40;

  const framesPerSecond = 30;

  const boardGrid = Grids.levelOne();

  const board = new Board(ctx, squareW, squareH, boardGrid);
  const warrior = new Warrior(ctx, board);
  const key = new Key(ctx, board);

  warrior.reset();

  const drawAll = () => {
    Util.colorRect(ctx, 0, 0, canvas.width, canvas.height, "#bec4ce");
    board.draw();
    warrior.draw();
  };

  const updateAll = () => {
    // moveAll();
    drawAll();
  };

  let mouseX = 0;

  let mouseY = 0;

  const updateMousePosition = e => {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;

    mouseX = e.clientX - rect.left - root.scrollLeft;
    mouseY = e.clientY - rect.top - root.scrollTop;
    // warrior.pos = [mouseX, mouseY];wdaas
  };

  canvas.addEventListener("mousemove", updateMousePosition);
  document.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 37:
        warrior.move(Warrior.MOVES.left);
        break;
      case 38:
        warrior.move(Warrior.MOVES.up);
        break;
      case 39:
        warrior.move(Warrior.MOVES.right);
        break;
      case 40:
        warrior.move(Warrior.MOVES.down);
        break;
    }
  });
  setInterval(updateAll, 1000 / framesPerSecond);
  warrior.draw();
});
