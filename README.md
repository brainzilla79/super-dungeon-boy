# Super Dungeon Boy
A retro style adventure game using HTML5 canvas and JavaScript.

![splash screen shot](https://github.com/brainzilla79/super-dungeon-boy/blob/master/docs/sdb_splash_screenshot.png)

![gameplay screen shot](https://github.com/brainzilla79/super-dungeon-boy/blob/master/docs/sdb_gameplay_screenshot.png)

## Sprite Animation

To make Super Dungeon Boy animated I used the [`CanvasRenderingContext2D.drawImage()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) method as well as some code I wrote myself starting with a custom class called `Sprite`.

```
class Sprite {
  constructor(img, imgWidth, imgHeight, rows, cols, frameCount) {
    this.img = img;
    this.width = imgWidth / cols;
    this.height = imgHeight / rows;
    this.currFrame = 0;
    this.frameCount = frameCount;
    this.x = 0;
    this.y = 0;
  }

  update(y) {
    this.currFrame = ++this.currFrame % this.frameCount;
    this.x = this.currFrame * this.width;
    this.y = y;
  }
}
```

As you can see this class has a constructor and a single method called update. The class is initialized with an html image element, the width of and height of the image, the number of rows and columns on the sprite and the `frameCount` which is the number of frames in each row of the sprite. 

Here is the actual sprite image.

![sdb sprite](https://github.com/brainzilla79/super-dungeon-boy/blob/master/docs/boy.png)

The update method takes a y value and calculates an x value and then updates the objects x and y value, which represent the top left coordinate of the portion of the sprite that will be rendered on the screen. Eveytime this method is called the portion of the sprite that is rendered moves over by one column and then cycles back around when it reaches the end with the modulo operator. The row that is rendered is determined by the y value that is passed in. 

The update method is called in the class, called `Warrior` that controls super dungeon boy. 
In that class I defined a method called animate that takes in a y value and a direction.

```
animate(imgY, dir) {
    this.dir = dir;
    this.sprite.update(imgY);
  }
```
The y value gets passed in to the update method and the direction of the boy is updated. (The direction is irrelevant to the sprite animation, it's used to determine which way the fireball shoots)

The animate method is then called in my `GameView` class inside an event handler. 

```
document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 37:
          this.game.move(GameView.MOVES.left);
          this.game.warrior.animate(160, "left");
          break;
        case 38:
          this.game.move(GameView.MOVES.up);
          this.game.warrior.animate(80, "up");
          break;
        case 39:
          this.game.move(GameView.MOVES.right);
          this.game.warrior.animate(240, "right");
          break;
        case 40:
          this.game.move(GameView.MOVES.down);
          this.game.warrior.animate(0, "down");
          break;
        case 32:
          this.game.fire(this.game.warrior.dir);
          break;
      }
    });
```
Here the animate method is called whenenver an arrow key is pressed and the y value that corresponds with that direction is passed in. 

Then, back in the warrior class I have a `draw()` method that calls `drawImage()`. 

```
draw() {
    this.ctx.drawImage(
      this.sprite.img,
      this.sprite.x,
      this.sprite.y,
      this.sprite.width,
      this.sprite.height,
      this.pos[0],
      this.pos[1],
      this.width,
      this.height
    );
  }
```

`ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);` 

In this case the image is an HTMLImageElement, the sx and sy are the x and y coordinate of the top left corner of the portion of the sprite that's rendered, sWidth and sHeight are the width and height of the portion of the sprite, dx and dy are the x and y coordinate for where the image is rendered on the canvas and dWidth and dHeight are the width and height that the image will have on the canvas when it's rendered. 





