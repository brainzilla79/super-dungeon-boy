const Util = require("./util");

class Board {
  constructor(ctx, squareW, squareH, grid) {
    this.ctx = ctx;
    this.squareW = squareW;
    this.squareH = squareH;
    this.grid = grid;
    this.gap = 2;
    this.cols = grid[0].length;
    this.rows = grid.length;
    this.img = document.getElementById("brick");
  }

  draw() {
    Util.colorRect(this.ctx, 0, 0, 800, 600, "#bec4ce");
    for (let eachRow = 0; eachRow < this.rows; eachRow++) {
      const row = this.grid[eachRow];
      for (let eachCol = 0; eachCol < row.length; eachCol++) {
        if (row[eachCol] === 1) {
          this.ctx.drawImage(
            this.img,
            this.squareW * eachCol,
            this.squareH * eachRow,
            this.squareW - 2,
            this.squareH - this.gap
          );
          
        }
      }
    }
  }
}

module.exports = Board;
