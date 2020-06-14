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
  }
}

function preload() {
  img = loadImage('ross_neu.png')
}

function setup() {

  createCanvas(400, 400);

  // Create the squares
  for (y = 0; y < height; y += 50) {
    for (x = 0; x < width; x += 50) {
      square = new Square(x, y);
      squares.push(square);
    }
  }

  //console.log(getCoordinates(squares[25]))
  var p = Math.floor(random(0, 63))
  let pos1 = squares[p].x
  let pos2 = squares[p].y

  allPossibleMoves([pos1, pos2])

}


let count = 0

function draw() {
  var p = Math.floor(random(0, 63))

  drawBoard();
  let x = squares[p].x
  let y = squares[p].y
  //console.log(squares[count])
  //image(img, x, y)
  //image(img, p, q)
}



function allPossibleMoves(pos) {
  // check all available moves from a given position
  // input is this format: [x, y]
console.log(one_two(8))

}

function square_with_fewest_onward_moves() {
  let arr = [] //array to return

}

function one_two(i) {

  let x = i % 8

  let y = Math.floor(i / 8)

  let arr = []
  arr.push(x,y)
  return arr
}

function two_one(posX, posY) {
  //translates Array grid from 2d to 1d and returns zero based 1 dim
  posX++ // add one because zero-based index
  posY++
  return ((posY-1) * 8 + (posX)) -1

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
