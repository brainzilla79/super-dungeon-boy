const Util = require("./util");
const Grids = require("./grids");

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const BOARD_W = 40;
  const BOARD_H = 40;
  const BOARD_GAP = 2;
  const BOARD_COLS = 20;
  const BOARD_ROWS = 15;

  const framesPerSecond = 30;

  const boardGrid = Grids.levelOne();

  const drawBoards = () => {
    for (let eachRow = 0; eachRow < boardGrid.length; eachRow++) {
      const row = boardGrid[eachRow];
      for (let eachCol = 0; eachCol < row.length; eachCol++) {
        if (row[eachCol] === 1)
          Util.colorRect(
            ctx,
            BOARD_W * eachCol,
            BOARD_H * eachRow,
            BOARD_W - 2,
            BOARD_H - BOARD_GAP,
            "#e54c0b"
          );
      }
    }
  };

  const drawAll = () => {
    Util.colorRect(ctx, 0, 0, canvas.width, canvas.height, "#bec4ce");
    drawBoards();
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

    // ballX = mouseX;
    // ballY = mouseY;
    // ballSpeedX = 4;
    // ballSpeedY = -4;
  };

  canvas.addEventListener("mousemove", updateMousePosition);
  setInterval(updateAll, 1000 / framesPerSecond);
});
