class Ghost {
  constructor(ctx, pos) {
    this.ctx = ctx;
    this.pos = pos;
    this.width = 40;
    this.height = 40;
    this.img = document.getElementById("leftGhost");
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

module.exports = Ghost;
