const Util = require("./util");

class Key {
  constructor(ctx) {
    this.pos = [0, 0];
  }

  draw() {
    Util.colorCircle(this.ctx, this.pos, 20, "#e8f442");
  }
}

module.exports = Key;
