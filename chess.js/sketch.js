var squares = [];
var visited = []
var img;

function knight() {
  this.x;
  this.y;

  this.move = function(_x, _y) {
    //keeps track of itself
    this.x = _x;
    this.y = _x
    image(img, this.x, this.y)
  }
}

function preload() {
  img = loadImage('ross_neu.png')
}

var aktuelle_position = 33

function setup() {

  createCanvas(400, 400);

  // Create the squares
  var index = 0;
  for (y = 0; y < height; y += 50) {
    for (x = 0; x < width; x += 50) {
      square = new Square(x, y, index);
      square.setvariables() // initialize the coordinates
      squares.push(square);
      index++;
    }
  }

  //testing:

  var testing = allPossibleMoves([5, 1])
console.log(testing)
}

function square_with_fewest_onward_moves(inp) {
  // input is like this: [[3,1], [0,1], [2,1]]
  let arr = [] //array to return
  let total;
  inp.forEach((element) => {
    // for each element, test all possible moves
    //  console.log(element)
    total += allPossibleMoves(element).length // 0 or 1
  })

  // optimal scenario: check for all possibilites iterating in each of the possible_fields


}

function draw() {
  drawBoard();


  squares.forEach((el) => {
    el.write()
  })


}

// input is this format: [x, y]
function allPossibleMoves(pos) {

  // check all available moves from a given position

  var p = pos[0]
  var q = pos[1]

  var possible_fields = []
  // all possible moves of the knight
  const X = [2, 1, -1, -2, -2, -1, 1, 2]
  const Y = [1, 2, 2, 1, -1, -2, -2, -1]

  for (let j = 0; j < 8; j++) {
    // testing all moves:
    var x = p + X[j]
    var y = q + Y[j]

    if (x >= 0 && y >= 0 && x < 8 && y < 8) {
      // if knight already visited, don't count that particular field

      // check here with x and y
      // this is not finished

      let arr = []
      arr.push(x)
      arr.push(y)
      possible_fields.push(arr)
    }
  }
  return possible_fields
}

function already_visited(arr) {
  // squares is a global array of objects containing the boolean attribute 'visited'
  // convert to 1-dimensional format

}



// returns an array
function one_two(i) {

  let x = i % 8

  let y = Math.floor(i / 8)

  let arr = []
  arr.push(x, y)
  return arr
}

// returns a zero based number
function two_one(posX, posY) {
  // translates Array grid from 2d to 1d

  posX++ // add one because zero-based index
  posY++
  return ((posY - 1) * 8 + (posX)) - 1

}
// translates from coordinates to 0-7 (returns array)
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

// Function just for drawing the board
function drawBoard() {
  black = 220;
  white = 30;
  for (y = 0; y < height; y += 50) {
    for (x = 0; x < width; x += 50) {
      if (x % 100 == 0) {
        if (y % 100 == 0) {
          fill(black);
        }
        if (y % 100 == 50) {
          fill(white);
        }
      }
      if (x % 100 == 50) {
        if (y % 100 == 50) {
          fill(black);
        }
        if (y % 100 == 0) {
          fill(white);
        }
      }

      rect(x, y, 50, 50);
    }
  }
}
