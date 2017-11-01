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
