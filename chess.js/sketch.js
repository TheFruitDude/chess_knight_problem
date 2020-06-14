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
  var index = 0;
  for (y = 0; y < height; y += 50) {
    for (x = 0; x < width; x += 50) {
      square = new Square(x, y, index);
      squares.push(square);
    index++;
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

  squares.forEach( (el) => {
    el.write()
  //  console.log(el.index())
  })


  //image(img, x, y)
  //image(img, p, q)
}



function allPossibleMoves(pos) {

  // check all available moves from a given position
  // input is this format: [x, y]
  // input needs to be mapped first

  // this function returns an array containing all possible coordinates where the knight can moves


  //console.log(pos[0] + " " + pos[1] + "  translates to " + map_to_8(pos))
  var a = map_to_8(pos) // 0 to 7
  var p = a[0]
  var q = a[1]

  // all possible moves of the knight
  const X = [2, 1, -1, -2, -2, -1, 1, 2]
  const Y = [1, 2, 2, 1, -1, -2, -2, -1]
  var possible_fields = []
  for (let j = 0; j < 8; j++) {
    // console.log("p + X[j]:" +  " " + p + " " + X[j])
    // testing all moves:
    var x = p + X[j]
    var y = q + Y[j]

    if (x >= 0 && y >= 0 && y < 8 && y < 8) {
      // here check if visited

      let arr = []
      arr.push(x)
      arr.push(y)
      possible_fields.push(arr)
    }
  }
  // we were here
//console.log(p + " " + q + " can move to ")
//console.log(possible_fields)



}


function square_with_fewest_onward_moves() {
  let arr = [] //array to return

}

function one_two(i) {

  let x = i % 8

  let y = Math.floor(i / 8)

  let arr = []
  arr.push(x, y)
  return arr
}

function two_one(posX, posY) {
  //translates Array grid from 2d to 1d and returns zero based 1 dim
  posX++ // add one because zero-based index
  posY++
  return ((posY - 1) * 8 + (posX)) - 1

}
// translates from coordinates to 0-7
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
