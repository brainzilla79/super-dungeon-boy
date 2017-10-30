const Util = require("./util");

class Key {
  constructor(ctx) {
    this.pos = [0, 0];
    this.ctx = ctx;
    this.img = document.getElementById("key");
  }

  draw() {
    this.ctx.drawImage(this.img, this.pos[0], this.pos[1], 40, 40);
    // Util.colorCircle(this.ctx, this.pos, 20, "#e8f442");
  }
}

module.exports = Key;
