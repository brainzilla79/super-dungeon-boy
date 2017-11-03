const Util = require("./util");

class Board {
  constructor(ctx, grid) {
    this.ctx = ctx;
    this.squareW = 40;
    this.squareH = 40;
    this.grid = grid;
    this.gap = 2;
    this.cols = grid[0].length;
    this.rows = grid.length;
    this.bricks = [];
    this.img = document.getElementById("brick");
  }

  draw() {
    Util.colorRect(this.ctx, 0, 0, 798, 598, "#bec4ce");
    this.bricks.forEach( brick => {
      this.ctx.drawImage(
        this.img,
        brick[0],
        brick[1],
        this.squareW - 2,
        this.squareH - this.gap
      );
    });
  }

  getGridPos(dir, nextPos) {
    let nextGridCol;
    let nextGridRow;

    if (dir[0] < 0 || dir[1] < 0) {
      nextGridCol = Math.floor((nextPos[0] + this.squareW / 2) / this.squareW);
      nextGridRow = Math.floor((nextPos[1] + this.squareH / 2) / this.squareH);
    } else {
      nextGridCol = Math.floor((nextPos[0] + this.squareW / 2) / this.squareW);
      nextGridRow = Math.floor((nextPos[1] + this.squareH / 2) / this.squareH);
    }

    return [nextGridRow, nextGridCol];
  }
}

module.exports = Board;
