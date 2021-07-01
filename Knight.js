function Knight() {
    this.x;
    this.y;
    frameRate(15)
    this.move = function (_x, _y) {
      //keeps track of itself
      this.x = map(_x, 0, 7, 0, 350)
      this.y = map(_y, 0, 7, 0, 350)

      image(img, this.x, this.y)
    }
  } 