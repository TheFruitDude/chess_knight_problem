function Square(_x, _y, _i) {
  this.x = _x;
  this.y = _y;
  this.i = _i;

  this.visited = false;

  this.highlight = function() {
    push();
    strokeWeight(2);
    stroke(255, 255, 0);
    noFill();
    rect(this.x, this.y, 50, 50);
    pop();
  }
  this.index = function() {
    // it's position (index)
    return this.i
  }

  this.write = function() {
    // simply writes the cell number in his field

    textSize(16)
    fill('red')
    text(this.index.toString(), this.x+15, this.y+15, 50, 50)

// counting from 0 to 63 from left to right obvisouly
  }
}
