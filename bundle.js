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
const Sprite = __webpack_require__(11);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Board {
  constructor(ctx, grid) {
    this.ctx = ctx;
    this.squareW = 40;
    this.squareH = 40;
    this.grid = grid;
    this.gap = 2;
    this.cols = grid[0].length;
    this.rows = grid.length;
    this.bricks = [];
    this.img = document.getElementById("brick");
  }

  draw() {
    Util.colorRect(this.ctx, 0, 0, 798, 598, "#bec4ce");
    this.bricks.forEach( brick => {
      this.ctx.drawImage(
        this.img,
        brick[0],
        brick[1],
        this.squareW - 2,
        this.squareH - this.gap
      );
    });
  }

  getGridPos(dir, nextPos) {
    let nextGridCol;
    let nextGridRow;

    if (dir[0] < 0 || dir[1] < 0) {
      nextGridCol = Math.floor((nextPos[0] + this.squareW / 2) / this.squareW);
      nextGridRow = Math.floor((nextPos[1] + this.squareH / 2) / this.squareH);
    } else {
      nextGridCol = Math.floor((nextPos[0] + this.squareW / 2) / this.squareW);
      nextGridRow = Math.floor((nextPos[1] + this.squareH / 2) / this.squareH);
    }

    return [nextGridRow, nextGridCol];
  }
}

module.exports = Board;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Key = __webpack_require__(10);
const Warrior = __webpack_require__(1);
const Door = __webpack_require__(7);
const Chest = __webpack_require__(6);
const Fireball = __webpack_require__(8);
const Ghost = __webpack_require__(9);

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
      this.gameWon();
    } else if (
      this.board.grid[nextGridRow][nextGridCol] !== 1 &&
      this.board.grid[nextGridRow][nextGridCol] !== 4
    ) {
      this.warrior.pos = nextPos;
    }
  }

  gameWon(nextGridRow, nextGridCol) {
    this.chest.img = document.getElementById("chestOpen");
    const fanfare = document.getElementById("fanfare");
    fanfare.play();
  }

  openDoor(nextGridRow, nextGridCol) {
    this.board.grid[nextGridRow][nextGridCol] = 0;
    delete this.doors[[nextGridRow, nextGridCol]];
    this.warrior.keys -= 1;
    const doorSound = document.getElementById("doorSound");
    doorSound.play();
  }

  pickupKey(nextPos, nextGridRow, nextGridCol) {
    this.warrior.pos = nextPos;
    this.warrior.keys += 1;
    this.board.grid[nextGridRow][nextGridCol] = 0;
    delete this.keys[[nextGridRow, nextGridCol]];
    const keySound = document.getElementById("keySound");
    keySound.play();
  }

  fire(dir) {
    const fireball = new Fireball(this.ctx, this.warrior.pos, dir);
    this.fireballs.push(fireball);
    const haduken = document.getElementById("haduken");
    haduken.play();
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
        const enemyKillSound = document.getElementById("enemyKill");
        enemyKillSound.play();
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
    Object.values(this.keys).forEach(key => key.draw());
    Object.values(this.doors).forEach(door => door.draw());
    Object.values(this.ghosts).forEach(ghost => ghost.draw());
    this.chest.draw();
    this.fireballs.forEach(fireball => fireball.draw());
    this.warrior.draw();
  }
}

module.exports = Game;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const Grids = {
  levelOne() {
    return [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 4, 0, 1, 1, 1, 1, 1],
      [1, 0, 3, 0, 3, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 1, 3, 0, 3, 1],
      [1, 0, 6, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 4, 1, 4, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 4, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 6, 1],
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Grids = __webpack_require__(4);
const Board = __webpack_require__(2);
const Game = __webpack_require__(3);
const GameView = __webpack_require__(12);

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const boardGrid = Grids.levelOne();

  const board = new Board(ctx, boardGrid);

  const game = new Game(ctx, board);
  new GameView(ctx, game).start();
});


/***/ }),
/* 6 */
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


/***/ }),
/* 9 */
/***/ (function(module, exports) {

class Ghost {
  constructor(ctx, pos) {
    this.ctx = ctx;
    this.pos = pos;
    this.width = 40;
    this.height = 40;
    this.dir = "left";
    this.img = document.getElementById("leftGhost");
  }
  
  toggleDir() {
    if (this.dir === "left") {
      this.dir = "right";
      this.img = document.getElementById("rightGhost"); 
    } else {
      this.dir = "left";
      this.img = document.getElementById("leftGhost");
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

Ghost.MOVES = {
  up: [0, -3],
  left: [-3, 0],
  down: [0, 3],
  right: [3, 0]
};

module.exports = Ghost;


/***/ }),
/* 10 */
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
  }
}

module.exports = Key;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

class Sprite {
  constructor(img, imgWidth, imgHeight, rows, cols, frameCount) {
    this.img = img;
    this.width = imgWidth / cols;
    this.height = imgHeight / rows;
    this.currFrame = 0;
    this.frameCount = frameCount;
    this.x = 0;
    this.y = 0;
  }

  update(ctx, pos, y) {
    this.currFrame = ++this.currFrame % this.frameCount;
    this.x = this.currFrame * this.width;
    this.y = y;
  }
}

module.exports = Sprite;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

class GameView {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
    this.framesPerSecond = 60;
    this.sounds = document.querySelectorAll("audio");
    this.soundToggle = document.getElementById("soundToggle");
    this.update = this.update.bind(this);
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 37:
          this.game.move(GameView.MOVES.left);
          this.game.warrior.animate(160, "left");
          break;
        case 38:
          this.game.move(GameView.MOVES.up);
          this.game.warrior.animate(80, "up");
          break;
        case 39:
          this.game.move(GameView.MOVES.right);
          this.game.warrior.animate(240, "right");
          break;
        case 40:
          this.game.move(GameView.MOVES.down);
          this.game.warrior.animate(0, "down");
          break;
        case 32:
          this.game.fire(this.game.warrior.dir);
          break;
      }
    });
  }

  checkSoundToggle() {
    this.sounds.forEach( sound => {
      this.soundToggle.checked === true ? sound.muted = true : sound.muted = false;
    });
  }

  update() {
    this.checkSoundToggle();
    this.game.moveObjects();
    this.game.render();
  }

  start() {
    const splashScreen = document.getElementById("splashScreen");
    const playButton = document.getElementById("playButton");
    playButton.addEventListener("click", () => {
      splashScreen.classList.add("hide");
      this.play();
    });
  }

  play() {
    this.bindKeyHandlers();
    setInterval(this.update, 1000 / this.framesPerSecond);
  }
}

GameView.MOVES = {
  up: [0, -3],
  left: [-3, 0],
  down: [0, 3],
  right: [3, 0]
};

module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map