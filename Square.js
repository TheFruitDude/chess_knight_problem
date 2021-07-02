function Square(_x, _y, _i) {
  this.x = _x;
  this.y = _y;
  this.i = _i;

// q and p are simply x and y, but mapped from range 0 to 9
  this.p; // for example [0, 1]
  this.q;

  this.visited = false;

  this.highlight = function() {
    if (this.visited) {
      push();
      strokeWeight(5);
      stroke(255, 255, 0);
      noFill();
      rect(this.x, this.y, 50, 50);
      pop();
    }

  }

  this.index = function() {
    return this.index
  }

this.initialize = function() {
  function one_two(i) {

    let x = i % 8

    let y = Math.floor(i / 8)

    let   arr = []
    arr.push(x, y)
    return arr
  }
  let arr = []


  arr = one_two(this.i)

  this.p = arr[0]
  this.q = arr[1]

}
  this.write = function() {
    // simply writes the cell number in his field
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
