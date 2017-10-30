const Key = require("./key");
const Warrior = require("./warrior");

class Game {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.keys = [];
    this.warrior = new Warrior(ctx, board);
    this.addKeys();
  }

  addKeys() {
    for (let eachRow = 0; eachRow < this.board.grid.length; eachRow++) {
      const row = this.board.grid[eachRow];
      for (let eachCol = 0; eachCol < row.length; eachCol++) {
        if (row[eachCol] === 3) {
          const key = new Key(this.ctx);
          key.pos[0] = eachCol * this.board.squareW;
          key.pos[1] = eachRow * this.board.squareH;
          this.keys.push(key);
        }
      }
    }
  }

  drawKeys() {
    this.keys.forEach(key => key.draw());
  }

  render() {
    this.board.draw();
    this.drawKeys();
    this.warrior.draw();
  }
}

module.exports = Game;