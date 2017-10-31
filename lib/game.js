const Key = require("./key");
const Warrior = require("./warrior");
const Door = require("./door");
const Chest = require("./chest");

class Game {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.keys = {};
    this.doors = {};
    this.warrior = new Warrior(ctx, board);
    this.chest = new Chest(ctx, [0, 0]);
    this.warrior.reset();
    this.addObjects();
  }

  addObjects() {
    for (let eachRow = 0; eachRow < this.board.grid.length; eachRow++) {
      const row = this.board.grid[eachRow];
      for (let eachCol = 0; eachCol < row.length; eachCol++) {
        const pos = [
          eachCol * this.board.squareW,
          eachRow * this.board.squareH
        ];
        if (row[eachCol] === 3) {
          const key = new Key(this.ctx, pos);
          this.keys[[eachRow, eachCol]] = key;
        } else if (row[eachCol] === 4) {
          const door = new Door(this.ctx, pos);
          this.doors[[eachRow, eachCol]] = door;
        } else if (row[eachCol] === 5) {
          this.chest.pos = pos;
        }
      }
    }
  }

  drawObjects() {
    Object.values(this.keys).forEach(key => key.draw());
    Object.values(this.doors).forEach(door => door.draw());
    this.chest.draw();
  }

  move(dir) {
    const nextPos = [
      this.warrior.pos[0] + dir[0],
      this.warrior.pos[1] + dir[1]
    ];
    let nextGridCol;
    let nextGridRow;

    if (dir[0] < 0) {
      this.warrior.img = document.getElementById("warriorLeft");
    } else if (dir[0] > 0) {
      this.warrior.img = document.getElementById("warriorRight");
    }
    if (dir[0] < 0 || dir[1] < 0) {
      nextGridCol = Math.floor(
        (nextPos[0] + this.board.squareW / 2) / this.board.squareW
      );
      nextGridRow = Math.floor(
        (nextPos[1] + this.board.squareH / 2) / this.board.squareH
      );
    } else {
      nextGridCol = Math.floor(
        (nextPos[0] + this.board.squareW) / this.board.squareW
      );
      nextGridRow = Math.floor(
        (nextPos[1] + this.board.squareH) / this.board.squareH
      );
    }

    if (this.board.grid[nextGridRow][nextGridCol] === 3) {
      this.warrior.pos = nextPos;
      this.warrior.keys += 1;
      this.board.grid[nextGridRow][nextGridCol] = 0;
      delete this.keys[[nextGridRow, nextGridCol]];
    } else if (
      this.board.grid[nextGridRow][nextGridCol] === 4 &&
      this.warrior.keys > 0
    ) {
      this.board.grid[nextGridRow][nextGridCol] = 0;
      delete this.doors[[nextGridRow, nextGridCol]];
      this.warrior.keys -= 1;
    } else if (this.board.grid[nextGridRow][nextGridCol] === 5) {
      this.chest.img = document.getElementById("chestOpen");
    } else if (
      this.board.grid[nextGridRow][nextGridCol] !== 1 &&
      this.board.grid[nextGridRow][nextGridCol] !== 4
    ) {
      this.warrior.pos = nextPos;
    }
  }

  render() {
    this.board.draw();
    this.drawObjects();
    this.warrior.draw();
  }
}

module.exports = Game;
