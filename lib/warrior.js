const Util = require("./util");

class Warrior {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.pos = [0, 0];
    this.width = 40;
    this.height = 60;
    this.keys = 0;
    this.dir = "right";
    this.img = document.getElementById("boy");
    this.imgX = 0;
    this.imgY = 0;
    
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
    this.ctx.drawImage( 
      this.img,
      this.imgX,
      this.imgY,
      50,
      80,
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
