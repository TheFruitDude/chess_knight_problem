p5.disableFriendlyErrors = true; // disables FES, could imrove performance

/*
  Important notes: -We have to calculate Sequence before making the animation.
  What to do when both choices are equal length?


  What if it gets stuck in the corner??? That's why I have to look before jumping there

*/


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

function square_with_fewest_onward_moves(possibleMoves) {

  if (possibleMoves.length == 0) {
    console.log("allPossibleMoves returned empty array" + " " + "last point xpos ypos = " + xpos + " " + ypos)
  }

  function sort_array(a, b) {
    return b.length - a.length;
  }


  // possibleMovesut is like this: [[3,1], [0,1], [2,1]]
  var arr = []

  possibleMoves.forEach((element) => {
    // console.log("element" , element)
    // for each of the available fields => test all possible moves which spring from that field

    let candidates = allPossibleMoves(element)
   // console.log(`the possible candidate moves of candidate ${element} are ${candidates}`)
    a = [...element, ...candidates]

    // var a = []
    arr.push(a)

    // arr[0] and arr[1] are the actual coordintes we are testing
     // console.log(a)

    //  push into a readable structure:
    //  it's crucial to understand the structure.  (console.log(arr))
    //  Index 0 and 1 represent the field of element in loop. 
    // all other elements are the moves to consider, as SubArrays

   
  })

  // now: all possible moves stored in arr

   console.log(arr)
  
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


var xpos = 0   // initial start for the knight (could be anywhere)
var ypos = 0   // 0-based

var step = 63
var zurückgelegter_weg = []

function draw() {
  let zarr = []
  zarr.push(xpos)
  zarr.push(ypos)

  zurückgelegter_weg.push(zarr)

  drawBoard();

  if (step >= 0) {
    
    //console.log(allPossibleMoves([xpos, ypos]));

    var next = square_with_fewest_onward_moves(allPossibleMoves([xpos, ypos]))

    // console.log(next)
    

    draw_line(zurückgelegter_weg) // works in dubvious ways
    xpos = next[0]
    ypos = next[1]

     squares[two_one(xpos, ypos)].visited = true 
     squares[two_one(xpos, ypos)].highlight()
  }

  knight.move(xpos, ypos)

  squares.forEach((el) => {
    el.write()
  })

  step = step - 1;
 // console.log(zurückgelegter_weg)
  // console.log("length = " + zurückgelegter_weg.length)
}

// possibleMovesut is this format: [x, y]
function allPossibleMoves(pos) {
 // returns an array
  // check all available moves from a given position

  var p = pos[0]
  var q = pos[1]

  var possible_fields = []
  // all possible moves of the knight
  const X = [2, 1, -1, -2, -2, -1, 1, 2]
  const Y = [1, 2, 2, 1, -1, -2, -2, -1]
  //  console.log("searching for all possible moves in " + pos[0] + " | " + pos[1])

  for (let j = 0; j < 8; j++) {
    // testing all moves:
    var x = p + X[j]
    var y = q + Y[j]

    if (x >= 0 && y >= 0 && x < 8 && y < 8) {
      // if knight already visited, don't count that particular field
      let isvisited = false
      if (squares[two_one(x, y)].visited == true) {
        //  console.log("found " + x + " | " + y + " " + "for " + pos[0] + " | " + pos[1] + " but already visited that")
        isvisited = true
      } else {
        isvisited = false
      }

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


function draw_line(possibleMoves) {
  // possibleMoves is like this: [[3,5], [5,3], [1,3]]
  let x1, x2, y1, y2
  for (let i = 0; i < possibleMoves.length - 1; i++) {
    x1 = map(possibleMoves[i][0], 0, 7, 0, 350)
    y1 = map(possibleMoves[i][1], 0, 7, 0, 350)

    x2 = map(possibleMoves[i + 1][0], 0, 7, 0, 350)
    y2 = map(possibleMoves[i + 1][1], 0, 7, 0, 350)

  }

  //stroke(255, 0,0)
  line(x1, y1, x2, y2)

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
  return (((posY - 1) * 8 + (posX)) - 1)

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
