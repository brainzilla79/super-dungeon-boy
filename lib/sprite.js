class Sprite {
  constructor(img, imgWidth, imgHeight, rows, cols, frameCount){
    this.img = img;
    this.width = imgWidth/cols;
    this.height = imgHeight/rows;
    this.currFrame = 0;
    this.frameCount = frameCount;
    this.x = 0;
    this.y = 0;
  }

  update(ctx, pos) {
    this.currFrame = ++this.currFrame % this.frameCount;
    this.x = this.currFrame * this.width;
    // ctx.clearRect(pos[0], pos[1], this.width, this.height);
  }
}

module.exports = Sprite;