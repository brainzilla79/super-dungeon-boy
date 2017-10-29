const Util = require("./util");

class Warrior {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.pos = [0, 0];
    this.width = 50;
    this.height = 50;
    this.img = document.getElementById('warrior');
    this.reset();
  }

  reset() {
    for (let eachRow = 0; eachRow < this.board.grid.length; eachRow++) {
      const row = this.board.grid[eachRow];
      for (let eachCol = 0; eachCol < row.length; eachCol++) {
        if (row[eachCol] === 2) {
          row[eachCol] = 0;
          this.pos[0] = eachCol * this.board.squareW + this.board.squareW / 2;
          this.pos[1] = eachRow * this.board.squareH + this.board.squareH / 2;
        }
      }
    }
  }

  draw() {
    this.ctx.drawImage(this.img, this.pos[0], this.pos[1], this.width, this.height);
    // console.log(this.row, this.col);
    // console.log(this.board.grid[this.row][this.col]);
  }

  move(dir) {
    
    this.pos[0] += dir[0];
    this.pos[1] += dir[1];
  }
}

Warrior.MOVES = {
  up: [0, -1],
  left: [-1, 0],
  down: [0, 1],
  right: [1, 0]
};

module.exports = Warrior;
