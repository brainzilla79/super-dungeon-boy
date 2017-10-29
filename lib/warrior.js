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
  }

  move(dir) {
    const nextPos = [this.pos[0] + dir[0], this.pos[1] + dir[1]];
    let nextGridCol;
    let nextGridRow;

    if (dir[0] < 0 || dir[1] < 0) {
      nextGridCol = Math.floor((nextPos[0] + this.board.squareW / 2) / this.board.squareW);
      nextGridRow = Math.floor((nextPos[1] + this.board.squareH / 2) / this.board.squareH);
    } else {
      nextGridCol = Math.floor((nextPos[0] + this.board.squareW) / this.board.squareW);
      nextGridRow = Math.floor((nextPos[1] + this.board.squareH) / this.board.squareH);
    }
    
    if (this.board.grid[nextGridRow][nextGridCol] !== 1) {
      this.pos = nextPos;
    } 
  }
}

Warrior.MOVES = {
  up: [0, -3],
  left: [-3, 0],
  down: [0, 3],
  right: [3, 0]
};

module.exports = Warrior;
