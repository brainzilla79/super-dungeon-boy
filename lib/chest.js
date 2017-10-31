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