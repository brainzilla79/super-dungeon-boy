const Key = require("./key");
const Warrior = require("./warrior");
const Door = require("./door");
const Chest = require("./chest");
const Fireball = require("./fireball");
const Ghost = require("./ghost");
const Grids = require("./grids");
const Board = require("./board");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx, Grids.levelOne());
    this.keys = {};
    this.doors = {};
    this.fireballs = [];
    this.ghosts = {};
    this.warrior = new Warrior(ctx, this.board);
    this.chest = new Chest(ctx, [0, 0]);
    this.intervalId = undefined;
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
        if (row[eachCol] === 1) {
          this.board.bricks.push(pos);
        } else if (row[eachCol] === 3) {
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

  move(dir) {
    const nextPos = [
      this.warrior.pos[0] + dir[0],
      this.warrior.pos[1] + dir[1]
    ];

    const gridPos = this.board.getGridPos(dir, nextPos);
    const nextGridRow = gridPos[0];
    const nextGridCol = gridPos[1];

    if (this.board.grid[nextGridRow][nextGridCol] === 3) {
      this.pickupKey(nextPos, nextGridRow, nextGridCol);
    } else if (
      this.board.grid[nextGridRow][nextGridCol] === 4 &&
      this.warrior.keys > 0
    ) {
      this.openDoor(nextGridRow, nextGridCol);
    } else if (this.board.grid[nextGridRow][nextGridCol] === 5) {
      this.gameOver("win");
    } else if (
      this.board.grid[nextGridRow][nextGridCol] !== 1 &&
      this.board.grid[nextGridRow][nextGridCol] !== 4
    ) {
      this.warrior.pos = nextPos;
    }
  }

  gameWon(nextGridRow, nextGridCol) {
    this.chest.img = document.getElementById("chestOpen");
    this.playSound("fanfare");
  }

  openDoor(nextGridRow, nextGridCol) {
    this.board.grid[nextGridRow][nextGridCol] = 0;
    delete this.doors[[nextGridRow, nextGridCol]];
    this.warrior.keys -= 1;
    this.playSound("doorSound");
  }

  pickupKey(nextPos, nextGridRow, nextGridCol) {
    this.warrior.pos = nextPos;
    this.warrior.keys += 1;
    this.board.grid[nextGridRow][nextGridCol] = 0;
    delete this.keys[[nextGridRow, nextGridCol]];
    this.playSound("keySound");
  }

  fire(dir) {
    const fireball = new Fireball(this.ctx, this.warrior.pos, dir);
    this.fireballs.push(fireball);
    this.playSound("haduken");
  }

  playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }

  moveFireball(fireball) {
    const dir = Fireball.MOVES[fireball.dir];
    const nextPos = [fireball.pos[0] + dir[0], fireball.pos[1] + dir[1]];

    const gridPos = this.board.getGridPos(dir, nextPos);
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
        this.playSound("enemyKill");
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
    const gridPos = this.board.getGridPos(dir, nextPos);
    const nextGridRow = gridPos[0];
    const nextGridCol = gridPos[1];

    if (
      this.board.grid[nextGridRow][nextGridCol] === 1 ||
      this.board.grid[nextGridRow][nextGridCol] === 4
    ) {
      dir = [dir[0] * -1, dir[1] * -1];
      nextPos = [ghost.pos[0] + dir[0], ghost.pos[1] + dir[1]];
      ghost.toggleDir();
    }
    delete this.ghosts[ghost.pos];
    this.ghosts[nextPos] = ghost;
    ghost.pos = nextPos;

    if (this.checkCollision(ghost, this.warrior)) {
      this.gameOver("lose");
    }
  }

  gameOver(result) {
    let sound;
    let msg;

    if (result === "win") {
      sound = "fanfare";
      msg = "You Win";
    } else if (result === "lose") {
      sound = "death";
      msg = "Game Over";
    }
    this.playSound(sound);
    clearInterval(this.intervalId);
    document.getElementById("gameOverScreen").classList.remove("hide");
    document.getElementById("gameOverMsg").innerHTML = msg;
  }

  moveObjects() {
    this.fireballs.forEach(fireball => this.moveFireball(fireball));
    Object.values(this.ghosts).forEach(ghost => this.moveGhost(ghost));
  }

  render() {
    this.board.draw();
    Object.values(this.keys).forEach(key => key.draw());
    Object.values(this.doors).forEach(door => door.draw());
    Object.values(this.ghosts).forEach(ghost => ghost.draw());
    this.chest.draw();
    this.fireballs.forEach(fireball => fireball.draw());
    this.warrior.draw();
  }
}

module.exports = Game;
