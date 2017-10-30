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
