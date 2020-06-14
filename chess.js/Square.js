function Square(_x, _y, _i) {
  this.x = _x;
  this.y = _y;
  this.i = _i;

  this.p; // for example [0, 1]
  this.q;

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
    let a = map_to_8([this.x, this.y])
    this.p = a[0]
    this.q = a[1]

    textSize(16)
    fill('red')
    var s = this.x + '\n' + this.y
    text(this.p + " " + this.q, this.x + 5, this.y + 15, 50, 50)

    // counting from 0 to 63 from left to right obvisouly

    function map_to_8(pos) {

      x = map(pos[0], 0, 350, 0, 7)
      y = map(pos[1], 0, 350, 0, 7)

      if (pos[0] == 0) {
        x = 0
      }
      if (pos[1] == 0) {
        y = 0
      }

      let arr = []
      arr.push(x)
      arr.push(y)
      return arr
    }
  }
}
