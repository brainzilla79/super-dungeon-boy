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
