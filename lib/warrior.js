const Util = require("./util");
const Sprite = require("./sprite");

class Warrior {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.pos = [0, 0];
    this.width = 40;
    this.height = 60;
    this.keys = 0;
    this.dir = "down";
    this.img = document.getElementById("boy");
    this.sprite = new Sprite(this.img, 200, 300, 4, 4, 4);
  }

  reset() {
    for (let eachRow = 0; eachRow < this.board.grid.length; eachRow++) {
      const row = this.board.grid[eachRow];
      for (let eachCol = 0; eachCol < row.length; eachCol++) {
        if (row[eachCol] === 2) {
          row[eachCol] = 0;
          this.pos[0] = eachCol * this.board.squareW;
          this.pos[1] = eachRow * this.board.squareH;
        }
      }
    }
  }

  animate(imgY, dir) {
    this.dir = dir;
    this.sprite.update(this.ctx, this.pos, imgY);
  }

  draw() {
    this.ctx.drawImage(
      this.sprite.img,
      this.sprite.x,
      this.sprite.y,
      this.sprite.width,
      this.sprite.height,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
  }
}

Warrior.MOVES = {
  up: [0, -3],
  left: [-3, 0],
  down: [0, 3],
  right: [3, 0]
};

module.exports = Warrior;
