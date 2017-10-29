const Key = require("./key");

class Game {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.keys = [];
  }

  addKeys() {
    for (let eachRow = 0; eachRow < this.board.grid.length; eachRow++) {
      const row = this.board.grid[eachRow];
      for (let eachCol = 0; eachCol < row.length; eachCol++) {
        if (row[eachCol] === 3) {
          const key = new Key();
          key.pos[0] = eachCol * this.board.squareW + this.board.squareW / 2;
          key.pos[1] = eachRow * this.board.squareH + this.board.squareH / 2;
          this.keys.push(key);
        }
      }
    }
  }

  drawKeys() {
    this.keys.forEach(key => key.draw());
  }
}
