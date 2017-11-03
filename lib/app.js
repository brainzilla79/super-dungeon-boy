const Grids = require("./grids");
const Board = require("./board");
const Warrior = require("./warrior");
const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const framesPerSecond = 60;
  const boardGrid = Grids.levelOne();

  const board = new Board(ctx, boardGrid);

  const game = new Game(ctx, board);
  console.log(game);
  new GameView(ctx, game).start();

});
