const Util = {
  colorRect(ctx, topLeftX, topLeftY, boxWidth, boxHeigth, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeigth);
  },
  colorCircle(ctx, centerX, centerY, radius, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.fill();
  }
};

module.exports = Util;
