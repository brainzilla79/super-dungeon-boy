const Util = require("./util");

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
