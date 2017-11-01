const Key = require("./key");
const Warrior = require("./warrior");
const Door = require("./door");
const Chest = require("./chest");
const Fireball = require("./fireball");
const Ghost = require("./ghost");

class Game {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.keys = {};
    this.doors = {};
    this.fireballs = [];
    this.ghosts = {};
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
        } else if (row[eachCol] === 6) {
          const ghost = new Ghost(this.ctx, pos);
          this.ghosts[pos] = ghost;
        }
      }
    }
  }

  drawObjects() {
    Object.values(this.keys).forEach(key => key.draw());
    Object.values(this.doors).forEach(door => door.draw());
    Object.values(this.ghosts).forEach(ghost => ghost.draw());
    this.chest.draw();
    this.fireballs.forEach(fireball => fireball.draw());
  }

  move(dir) {
    const nextPos = [
      this.warrior.pos[0] + dir[0],
      this.warrior.pos[1] + dir[1]
    ];

    if (dir[0] < 0) {
      this.warrior.img = document.getElementById("warriorLeft");
    } else if (dir[0] > 0) {
      this.warrior.img = document.getElementById("warriorRight");
    }

    const gridPos = this.getWarriorGridPos(dir, nextPos);
    const nextGridRow = gridPos[0];
    const nextGridCol = gridPos[1];

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

  fire(dir) {
    const fireball = new Fireball(this.ctx, this.warrior.pos, dir);
    this.fireballs.push(fireball);
    const haduken = document.getElementById("haduken");
    // haduken.play();
  }

  moveFireball(fireball) {
    const dir = Fireball.MOVES[fireball.dir];
    const nextPos = [fireball.pos[0] + dir[0], fireball.pos[1] + dir[1]];

    const gridPos = this.getFireballGridPos(dir, nextPos);
    const nextGridRow = gridPos[0];
    const nextGridCol = gridPos[1];

    if (
      this.board.grid[nextGridRow][nextGridCol] !== 1 &&
      this.board.grid[nextGridRow][nextGridCol] !== 4
    ) {
      fireball.pos = nextPos;
    } else {
      this.fireballs.shift();
    }

    Object.values(this.ghosts).forEach(ghost => {
      if (this.checkCollision(fireball, ghost)) {
        delete this.ghosts[ghost.pos];
        this.fireballs.shift();
      }
    });
  }

  checkCollision(object1, object2) {
    if (
      object1.pos[0] < object2.pos[0] + object2.width &&
      object1.pos[0] + object1.width > object2.pos[0] &&
      object1.pos[1] < object2.pos[1] + object2.height &&
      object1.pos[1] + object1.height > object2.pos[1]
    ) {
      return true;
    } else {
      return false;
    }
  }

  moveGhost(ghost) {
    let dir = Ghost.MOVES[ghost.dir];
    let nextPos = [ghost.pos[0] + dir[0], ghost.pos[1] + dir[1]];
    const gridPos = this.getFireballGridPos(dir, nextPos);
    const nextGridRow = gridPos[0];
    const nextGridCol = gridPos[1];

    if (this.board.grid[nextGridRow][nextGridCol] === 1) {
      dir = [dir[0] * -1, dir[1] * -1];
      nextPos = [ghost.pos[0] + dir[0], ghost.pos[1] + dir[1]];
      ghost.toggleDir();
    }
    delete this.ghosts[ghost.pos];
    this.ghosts[nextPos] = ghost;
    ghost.pos = nextPos;

    if (this.checkCollision(ghost, this.warrior)) {
      console.log("game over!");
    }
  }

  moveObjects() {
    this.fireballs.forEach(fireball => this.moveFireball(fireball));
    Object.values(this.ghosts).forEach(ghost => this.moveGhost(ghost));
  }

  render() {
    this.board.draw();
    this.drawObjects();
    this.warrior.draw();
  }

  getFireballGridPos(dir, nextPos) {
    let nextGridCol;
    let nextGridRow;

    if (dir[0] < 0 || dir[1] < 0) {
      nextGridCol = Math.floor(
        (nextPos[0] + this.board.squareW / 2) / this.board.squareW
      );
      nextGridRow = Math.floor(
        (nextPos[1] + this.board.squareH / 2) / this.board.squareH
      );
    } else {
      nextGridCol = Math.floor(
        (nextPos[0] + this.board.squareW / 2) / this.board.squareW
      );
      nextGridRow = Math.floor(
        (nextPos[1] + this.board.squareH / 2) / this.board.squareH
      );
    }

    return [nextGridRow, nextGridCol];
  }

  getWarriorGridPos(dir, nextPos) {
    let nextGridCol;
    let nextGridRow;

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

    return [nextGridRow, nextGridCol];
  }
}

module.exports = Game;
