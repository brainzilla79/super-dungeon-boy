const Util = {
  colorRect(ctx, topLeftX, topLeftY, boxWidth, boxHeigth, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeigth);
  }
};

module.exports = Util;
