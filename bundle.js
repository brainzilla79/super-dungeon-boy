/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  colorRect(ctx, topLeftX, topLeftY, boxWidth, boxHeigth, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeigth);
  },
  colorCircle(ctx, pos, radius, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], radius, 0, Math.PI * 2, true);
    ctx.fill();
  }
};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Board {
  constructor(ctx, squareW, squareH, grid) {
    this.ctx = ctx;
    this.squareW = squareW;
    this.squareH = squareH;
    this.grid = grid;
    this.gap = 2;
    this.cols = grid[0].length;
    this.rows = grid.length;
    this.img = document.getElementById("brick");
  }

  draw() {
    Util.colorRect(this.ctx, 0, 0, 800, 600, "#bec4ce");
    for (let eachRow = 0; eachRow < this.rows; eachRow++) {
      const row = this.grid[eachRow];
      for (let eachCol = 0; eachCol < row.length; eachCol++) {
        if (row[eachCol] === 1) {
          this.ctx.drawImage(
            this.img,
            this.squareW * eachCol,
            this.squareH * eachRow,
            this.squareW - 2,
            this.squareH - this.gap
          );
          
        }
      }
    }
  }
}

module.exports = Board;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Grids = {
  levelOne() {
    return [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 4, 0, 1, 1, 1, 1, 1],
      [1, 0, 3, 0, 3, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 1, 3, 0, 3, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 4, 1, 4, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 4, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 4, 0, 0, 4, 0, 0, 4, 0, 5, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
  }
};

module.exports = Grids;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Key {
  constructor(ctx, pos) {
    this.pos = pos;
    this.ctx = ctx;
    this.img = document.getElementById("key");
  }

  draw() {
    this.ctx.drawImage(this.img, this.pos[0], this.pos[1], 40, 40);
    // Util.colorCircle(this.ctx, this.pos, 20, "#e8f442");
  }
}

module.exports = Key;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Warrior {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.pos = [0, 0];
    this.width = 50;
    this.height = 50;
    this.keys = 0;
    this.dir = "right";
    this.img = document.getElementById("warriorRight");
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Grids = __webpack_require__(2);
const Board = __webpack_require__(1);
const Warrior = __webpack_require__(4);
const Game = __webpack_require__(6);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const squareW = 40;
  const squareH = 40;

  const framesPerSecond = 60;

  const boardGrid = Grids.levelOne();

  const board = new Board(ctx, squareW, squareH, boardGrid);

  const game = new Game(ctx, board);

  const update = () => {
    game.moveObjects();
    game.render();
  };

  document.addEventListener("keydown", e => {
    switch (e.keyCode) {
      case 37:
        game.move(Warrior.MOVES.left);
        game.warrior.dir = "left";
        break;
      case 38:
        game.move(Warrior.MOVES.up);
        game.warrior.dir = "up";
        break;
        case 39:
        game.move(Warrior.MOVES.right);
        game.warrior.dir = "right";
        break;
        case 40:
        game.move(Warrior.MOVES.down);
        game.warrior.dir = "down";
        break;
      case 32: 
        game.fire(game.warrior.dir);
        break;
    }
  });
  setInterval(update, 1000 / framesPerSecond);
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Key = __webpack_require__(3);
const Warrior = __webpack_require__(4);
const Door = __webpack_require__(7);
const Chest = __webpack_require__(8);
const Fireball = __webpack_require__(9);

class Game {
  constructor(ctx, board) {
    this.ctx = ctx;
    this.board = board;
    this.keys = {};
    this.doors = {};
    this.fireballs = [];
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
  }

  moveFireball(fireball) {
    const dir = Fireball.MOVES[fireball.dir];
    const nextPos = [fireball.pos[0] + dir[0], fireball.pos[1] + dir[1]];

    const gridPos = this.getFireballGridPos(dir, nextPos);
    const nextGridRow = gridPos[0];
    const nextGridCol = gridPos[1];

    if (this.board.grid[nextGridRow][nextGridCol] !== 1) {
      fireball.pos = nextPos;
    } else {
      this.fireballs.shift();
    }
  }

  moveObjects() {
    this.fireballs.forEach(fireball => this.moveFireball(fireball));
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


/***/ }),
/* 7 */
/***/ (function(module, exports) {

class Door {
  constructor(ctx, pos) {
    this.img = document.getElementById("door");
    this.pos = pos;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.drawImage(this.img, this.pos[0], this.pos[1], 40, 40);
  }
}

module.exports = Door;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

class Chest {
  constructor(ctx, pos) {
    this.ctx = ctx;
    this.img = document.getElementById("chestClosed");
    this.width = 40;
    this.height = 40;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
  }
}

module.exports = Chest;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

class Fireball {
  constructor(ctx, pos, dir) {
    this.ctx = ctx;
    this.pos = pos;
    this.width = 20;
    this.height = 20;
    this.dir = dir;
    this.img = this.getImage(dir);
  }

  getImage(dir) {
    switch (dir) {
      case "right":
        return document.getElementById("rightFireball");
      case "left":
        return document.getElementById("leftFireball");
      case "up":
        return document.getElementById("upFireball");
      case "down":
        return document.getElementById("downFireball");
    }
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
  }
}

Fireball.MOVES = {
  up: [0, -6],
  left: [-6, 0],
  down: [0, 6],
  right: [6, 0]
};

module.exports = Fireball;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map