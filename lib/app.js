const Grids = require("./grids");
const Board = require("./board");
const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const boardGrid = Grids.levelOne();

  const board = new Board(ctx, boardGrid);

  const game = new Game(ctx, board);
  new GameView(ctx, game).start();
});
