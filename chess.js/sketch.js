p5.disableFriendlyErrors = true; // disables FES
var squares = [];
var visited = []
var img;
var knight;

function Knight() {
  this.x;
  this.y;
  frameRate(15)
  this.move = function(_x, _y) {

    //keeps track of itself
    this.x = map(_x, 0, 7, 0, 350)
    this.y = map(_y, 0, 7, 0, 350)
    image(img, this.x, this.y)
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
      square.setvariables() // initialize the coordinates
      squares.push(square);
      index++;
    }
  }
  knight = new Knight()
  // var testing = allPossibleMoves([2, 5])
  // var all = square_with_fewest_onward_moves(testing)
  // console.log(all)
}

function square_with_fewest_onward_moves(inp) {
  function sort_array( (a,b) => {
    return b.length - a.length;
  })


  // input is like this: [[3,1], [0,1], [2,1]]
  var arr = []

  inp.forEach((element) => {
    // for each of the available fields, test all possible moves in each of those fields

    var b = allPossibleMoves(element)
    var a = []
    a = [...element, ...b]
    arr.push(a)
    // push into a readable structure:
    // it's crucial to understand the structure.  (console.log(arr))
    // Index 0 and 1 represent the field. all the other elements in the array (array of arrays) are the connections from that field
  })
  // now we have saved all possible moves in arr
  var shortest = arr[0]
  arr.forEach((el) => {
    if (arr.indexOf(el) !== 0 && arr.indexOf(el) !== 1) {
      if (el.length < shortest.length) {
        shortest = el
      }
    }
  })
  // return the square with the fewest onward  moves
  // implement rule to check if square visited.

  return shortest
}

// initial start for the knight (could be anywhere)
var xpos = 4
var ypos = 4

var posArr = []
var rand = [4, 6]
var rand2 = [3, 4]
var step = 10

function draw() {
  drawBoard();


  if (step > 0) {
    var next = square_with_fewest_onward_moves(allPossibleMoves([xpos, ypos]))
    stroke(255)
    // implement a rule for next, so that each square can only be visited once.

    // if square_with_fewest_onward_moves() returns a square which has already been visited,
    // it should return a different square
    line(xpos, ypos, next[0], next[1])
    xpos = next[0]
    ypos = next[1]

    console.log(xpos, ypos)

    squares[two_one(xpos, ypos)].visited = true
    //knight.move(xpos, ypos)


  //  console.log("From xpos, ypos " + xpos + "  " + ypos + " " )
  //  console.log(next)
  }

knight.move(xpos, ypos)
  squares.forEach((el) => {
    el.write()
  })

  step = step - 1;
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
      let isvisited = false
      squares.forEach((el) => {
        if (el.p == x && el.q == y) {
          //  console.log(el.p + " " + el.q + " " + el.i)
          if (el.visited == true) {
            isvisited == true
          } else {
            isvisited == false
          }
        }
      })
      // check here with x and y
      // this is not finished
      if (isvisited == false) {
        let arr = []
        arr.push(x)
        arr.push(y)
        possible_fields.push(arr)
      }

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
