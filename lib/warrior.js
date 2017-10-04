const Util = require("./util");

class Warrior {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.posX = 0;
    this.posY = 0;

    this.reset();
  }

  reset() {
    for (let eachRow = 0; eachRow < this.board.length; eachRow++) {
      const row = this.board[eachRow];
      for (let eachCol = 0; eachCol < row.length; eachCol++) {
        if (row[eachCol] === 2) {
          row[eachCol] = 0;
          this.posX = eachCol * this.board.squareW + this.board.squareW / 2;
          this.posY = eachRow * this.board.squareH + this.board.squareH / 2;
        }
      }
    }
  }
  draw() {
    Util.colorCircle(this.ctx, this.posX, this.posY, 10, "#e80b0b");
  }
}

module.exports = Warrior;
