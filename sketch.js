p5.disableFriendlyErrors = true; // disables FES, could imrove performance

/*

  -We have to calculate Sequence before making the animation.

*/


var squares = [];
var img;
var knight;

var moves; // hardcoced all moves from each q



function preload() {
   img = loadImage('ross_neu.png')
}


function setup() {

   frameRate(1)

   createCanvas(400, 400);
   // Create the squares
   var index = 0;
   for (y = 0; y < height; y += 50) {
      for (x = 0; x < width; x += 50) {
         square = new Square(x, y, index);
         square.initialize() // initialize the coordinates
         squares.push(square);
         index++;
      }
   }
   knight = new Knight()

   //try_to_find_path()
}

function square_with_fewest_onward_moves(possibleMoves) {

   if (possibleMoves.length == 0) {
      console.log("allPossibleMoves returned empty array" + " " + "last point xpos ypos = " + xpos + " " + ypos)
   }

   function sort_array(a, b) {
      return b.length - a.length;
   }


   // input is like this: [[3,1], [0,1], [2,1]]
   var arr = []

   possibleMoves.forEach((element) => {
      let candidates = allPossibleMoves(element)

      a = [...element, ...candidates]
      arr.push(a)
      /*
          arr[0] and arr[1] are the actual coordintes we are testing
          console.log(a)
           push into a readable structure:
           it's crucial to understand the structure.  (console.log(arr))
           Index 0 and 1 represent the field of element in loop. 
           all other elements are the moves to consider, as SubArrays
      */

   })

   var shortest = arr[0]


   arr.forEach((el) => {
      //console.log(`possible consideration for field ${el[0]} | ${el[1]} is [${el}]`)
      if (arr.indexOf(el) !== 0 && arr.indexOf(el) !== 1) {

         if (el.length < shortest.length) {
            shortest = el
            // this is deterministic, will always yield the same value
         }
      }
   })


   var alternatives = []

   arr.forEach((el) => {
      if (arr.indexOf(el) !== 0 && arr.indexOf(el) !== 1) {

         if (el.length == shortest.length && el !== shortest) {
            alternatives.push(el)
         }
      }
   })


   if (alternatives.length > 0) {

      randomNUmber = getRandomBetween(0, alternatives.length - 1)

      console.log(`randomly choosing ${alternatives[randomNUmber]} as the continuation`)
      return alternatives[randomNUmber]
   }
   console.log(`choosing ${shortest} as the continuation`)
   return shortest
}

function getRandomBetween(min, max) {
   return Math.random() * (max - min) + min;
}


var xpos = 2   // initial start for the knight (could be anywhere)
var ypos = 2   // 0-based

var step = 63
var zurückgelegter_weg = []

function draw() {


  


   drawBoard();
   
   /*
   squares.forEach((el) => {
     el.write()
   })
   */

   if (step >= 0) {


      squares[two_one(xpos, ypos)].visited = true
      squares[two_one(xpos, ypos)].highlight()
      zurückgelegter_weg.push([xpos, ypos])

      var next = square_with_fewest_onward_moves(allPossibleMoves([xpos, ypos]))
      if (next !== undefined) {


         // console.log(next)

         xpos = next[0]
         ypos = next[1]

         console.log(`visiting ${xpos} | ${ypos}`);
         knight.move(xpos, ypos)
         step = step - 1;

      } else {
         console.log(`Did not find path. Exiting with ${step} remaining.`)
         throw new Error();
      }
   }
   squares.forEach((el) => {
      if (el.visited) {
         el.highlight()
      }
   })

}

function try_to_find_path() {

   for (i = 0; i < 50; i++) {
      squares.forEach((el) => el.visited = false)
      xpos = 4;
      ypos = 4;
      squares[two_one(xpos, ypos)].visited = true

      step = 63
      



      while (step >= 0) {


         squares[two_one(xpos, ypos)].visited = true
         squares[two_one(xpos, ypos)].highlight()
         zurückgelegter_weg.push([xpos, ypos])

         var next = square_with_fewest_onward_moves(allPossibleMoves([xpos, ypos]))
         if (next !== undefined) {

            xpos = next[0]
            ypos = next[1]

            console.log(`visiting ${xpos} | ${ypos}`);
            knight.move(xpos, ypos)
            step = step - 1;

         } else {
            console.log(`Did not find path. Exiting with ${step} remaining. continue at iteration ${i + 1}`)
            step = -2;
         }
      }
      if (step == -1) {
         print("success")
         return
      }

   }
}





// this function ignores allPosssiblefields
function refactoredAllPossibleMoves(position) {

   m = 8
   n = 8
   p = position[0]
   q = position[1]
   var possible_fields = []
   let X = [2, 1, -1, -2, -2, -1, 1, 2];
   let Y = [1, 2, 2, 1, -1, -2, -2, -1];

   let count = 0;

   // Check if each possible move is valid or not
   for (let i = 0; i < 8; i++) {

      // Position of knight after move
      let x = p + X[i];
      let y = q + Y[i];

      // count valid moves
      if (x >= 0 && y >= 0 && x < n && y < m) {
         let arr = [x, y]
         possible_fields.push(arr)
      }
   }

   // Return number of possible moves
   return possible_fields;
}






// input is this format: [x, y]
function allPossibleMoves(pos) {

   var p = pos[0]
   var q = pos[1]

   var possible_fields = []

   const X = [2, 1, -1, -2, -2, -1, 1, 2]
   const Y = [1, 2, 2, 1, -1, -2, -2, -1]

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

// returns a zero based number
function two_one(posX, posY) {
   // translates Array grid from 2d to 1d
   posX++ // add one because zero-based index
   posY++
   return (((posY - 1) * 8 + (posX)) - 1)

}


// Function just for drawing the board
function drawBoard() {
   stroke(0, 0, 0)
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

function  mousePressed() {
   squares.forEach( (el) => {
      el.clicked();
   })
}
// hardcoded all moves for each [i][j] (should improve performance)
moves = [
   [
      [
         [
            2,
            1
         ],
         [
            1,
            2
         ]
      ],
      [
         [
            2,
            2
         ],
         [
            1,
            3
         ],
         [
            2,
            0
         ]
      ],
      [
         [
            2,
            3
         ],
         [
            1,
            4
         ],
         [
            1,
            0
         ],
         [
            2,
            1
         ]
      ],
      [
         [
            2,
            4
         ],
         [
            1,
            5
         ],
         [
            1,
            1
         ],
         [
            2,
            2
         ]
      ],
      [
         [
            2,
            5
         ],
         [
            1,
            6
         ],
         [
            1,
            2
         ],
         [
            2,
            3
         ]
      ],
      [
         [
            2,
            6
         ],
         [
            1,
            7
         ],
         [
            1,
            3
         ],
         [
            2,
            4
         ]
      ],
      [
         [
            2,
            7
         ],
         [
            1,
            4
         ],
         [
            2,
            5
         ]
      ],
      [
         [
            1,
            5
         ],
         [
            2,
            6
         ]
      ]
   ],
   [
      [
         [
            3,
            1
         ],
         [
            2,
            2
         ],
         [
            0,
            2
         ]
      ],
      [
         [
            3,
            2
         ],
         [
            2,
            3
         ],
         [
            0,
            3
         ],
         [
            3,
            0
         ]
      ],
      [
         [
            3,
            3
         ],
         [
            2,
            4
         ],
         [
            0,
            4
         ],
         [
            0,
            0
         ],
         [
            2,
            0
         ],
         [
            3,
            1
         ]
      ],
      [
         [
            3,
            4
         ],
         [
            2,
            5
         ],
         [
            0,
            5
         ],
         [
            0,
            1
         ],
         [
            2,
            1
         ],
         [
            3,
            2
         ]
      ],
      [
         [
            3,
            5
         ],
         [
            2,
            6
         ],
         [
            0,
            6
         ],
         [
            0,
            2
         ],
         [
            2,
            2
         ],
         [
            3,
            3
         ]
      ],
      [
         [
            3,
            6
         ],
         [
            2,
            7
         ],
         [
            0,
            7
         ],
         [
            0,
            3
         ],
         [
            2,
            3
         ],
         [
            3,
            4
         ]
      ],
      [
         [
            3,
            7
         ],
         [
            0,
            4
         ],
         [
            2,
            4
         ],
         [
            3,
            5
         ]
      ],
      [
         [
            0,
            5
         ],
         [
            2,
            5
         ],
         [
            3,
            6
         ]
      ]
   ],
   [
      [
         [
            4,
            1
         ],
         [
            3,
            2
         ],
         [
            1,
            2
         ],
         [
            0,
            1
         ]
      ],
      [
         [
            4,
            2
         ],
         [
            3,
            3
         ],
         [
            1,
            3
         ],
         [
            0,
            2
         ],
         [
            0,
            0
         ],
         [
            4,
            0
         ]
      ],
      [
         [
            4,
            3
         ],
         [
            3,
            4
         ],
         [
            1,
            4
         ],
         [
            0,
            3
         ],
         [
            0,
            1
         ],
         [
            1,
            0
         ],
         [
            3,
            0
         ],
         [
            4,
            1
         ]
      ],
      [
         [
            4,
            4
         ],
         [
            3,
            5
         ],
         [
            1,
            5
         ],
         [
            0,
            4
         ],
         [
            0,
            2
         ],
         [
            1,
            1
         ],
         [
            3,
            1
         ],
         [
            4,
            2
         ]
      ],
      [
         [
            4,
            5
         ],
         [
            3,
            6
         ],
         [
            1,
            6
         ],
         [
            0,
            5
         ],
         [
            0,
            3
         ],
         [
            1,
            2
         ],
         [
            3,
            2
         ],
         [
            4,
            3
         ]
      ],
      [
         [
            4,
            6
         ],
         [
            3,
            7
         ],
         [
            1,
            7
         ],
         [
            0,
            6
         ],
         [
            0,
            4
         ],
         [
            1,
            3
         ],
         [
            3,
            3
         ],
         [
            4,
            4
         ]
      ],
      [
         [
            4,
            7
         ],
         [
            0,
            7
         ],
         [
            0,
            5
         ],
         [
            1,
            4
         ],
         [
            3,
            4
         ],
         [
            4,
            5
         ]
      ],
      [
         [
            0,
            6
         ],
         [
            1,
            5
         ],
         [
            3,
            5
         ],
         [
            4,
            6
         ]
      ]
   ],
   [
      [
         [
            5,
            1
         ],
         [
            4,
            2
         ],
         [
            2,
            2
         ],
         [
            1,
            1
         ]
      ],
      [
         [
            5,
            2
         ],
         [
            4,
            3
         ],
         [
            2,
            3
         ],
         [
            1,
            2
         ],
         [
            1,
            0
         ],
         [
            5,
            0
         ]
      ],
      [
         [
            5,
            3
         ],
         [
            4,
            4
         ],
         [
            2,
            4
         ],
         [
            1,
            3
         ],
         [
            1,
            1
         ],
         [
            2,
            0
         ],
         [
            4,
            0
         ],
         [
            5,
            1
         ]
      ],
      [
         [
            5,
            4
         ],
         [
            4,
            5
         ],
         [
            2,
            5
         ],
         [
            1,
            4
         ],
         [
            1,
            2
         ],
         [
            2,
            1
         ],
         [
            4,
            1
         ],
         [
            5,
            2
         ]
      ],
      [
         [
            5,
            5
         ],
         [
            4,
            6
         ],
         [
            2,
            6
         ],
         [
            1,
            5
         ],
         [
            1,
            3
         ],
         [
            2,
            2
         ],
         [
            4,
            2
         ],
         [
            5,
            3
         ]
      ],
      [
         [
            5,
            6
         ],
         [
            4,
            7
         ],
         [
            2,
            7
         ],
         [
            1,
            6
         ],
         [
            1,
            4
         ],
         [
            2,
            3
         ],
         [
            4,
            3
         ],
         [
            5,
            4
         ]
      ],
      [
         [
            5,
            7
         ],
         [
            1,
            7
         ],
         [
            1,
            5
         ],
         [
            2,
            4
         ],
         [
            4,
            4
         ],
         [
            5,
            5
         ]
      ],
      [
         [
            1,
            6
         ],
         [
            2,
            5
         ],
         [
            4,
            5
         ],
         [
            5,
            6
         ]
      ]
   ],
   [
      [
         [
            6,
            1
         ],
         [
            5,
            2
         ],
         [
            3,
            2
         ],
         [
            2,
            1
         ]
      ],
      [
         [
            6,
            2
         ],
         [
            5,
            3
         ],
         [
            3,
            3
         ],
         [
            2,
            2
         ],
         [
            2,
            0
         ],
         [
            6,
            0
         ]
      ],
      [
         [
            6,
            3
         ],
         [
            5,
            4
         ],
         [
            3,
            4
         ],
         [
            2,
            3
         ],
         [
            2,
            1
         ],
         [
            3,
            0
         ],
         [
            5,
            0
         ],
         [
            6,
            1
         ]
      ],
      [
         [
            6,
            4
         ],
         [
            5,
            5
         ],
         [
            3,
            5
         ],
         [
            2,
            4
         ],
         [
            2,
            2
         ],
         [
            3,
            1
         ],
         [
            5,
            1
         ],
         [
            6,
            2
         ]
      ],
      [
         [
            6,
            5
         ],
         [
            5,
            6
         ],
         [
            3,
            6
         ],
         [
            2,
            5
         ],
         [
            2,
            3
         ],
         [
            3,
            2
         ],
         [
            5,
            2
         ],
         [
            6,
            3
         ]
      ],
      [
         [
            6,
            6
         ],
         [
            5,
            7
         ],
         [
            3,
            7
         ],
         [
            2,
            6
         ],
         [
            2,
            4
         ],
         [
            3,
            3
         ],
         [
            5,
            3
         ],
         [
            6,
            4
         ]
      ],
      [
         [
            6,
            7
         ],
         [
            2,
            7
         ],
         [
            2,
            5
         ],
         [
            3,
            4
         ],
         [
            5,
            4
         ],
         [
            6,
            5
         ]
      ],
      [
         [
            2,
            6
         ],
         [
            3,
            5
         ],
         [
            5,
            5
         ],
         [
            6,
            6
         ]
      ]
   ],
   [
      [
         [
            7,
            1
         ],
         [
            6,
            2
         ],
         [
            4,
            2
         ],
         [
            3,
            1
         ]
      ],
      [
         [
            7,
            2
         ],
         [
            6,
            3
         ],
         [
            4,
            3
         ],
         [
            3,
            2
         ],
         [
            3,
            0
         ],
         [
            7,
            0
         ]
      ],
      [
         [
            7,
            3
         ],
         [
            6,
            4
         ],
         [
            4,
            4
         ],
         [
            3,
            3
         ],
         [
            3,
            1
         ],
         [
            4,
            0
         ],
         [
            6,
            0
         ],
         [
            7,
            1
         ]
      ],
      [
         [
            7,
            4
         ],
         [
            6,
            5
         ],
         [
            4,
            5
         ],
         [
            3,
            4
         ],
         [
            3,
            2
         ],
         [
            4,
            1
         ],
         [
            6,
            1
         ],
         [
            7,
            2
         ]
      ],
      [
         [
            7,
            5
         ],
         [
            6,
            6
         ],
         [
            4,
            6
         ],
         [
            3,
            5
         ],
         [
            3,
            3
         ],
         [
            4,
            2
         ],
         [
            6,
            2
         ],
         [
            7,
            3
         ]
      ],
      [
         [
            7,
            6
         ],
         [
            6,
            7
         ],
         [
            4,
            7
         ],
         [
            3,
            6
         ],
         [
            3,
            4
         ],
         [
            4,
            3
         ],
         [
            6,
            3
         ],
         [
            7,
            4
         ]
      ],
      [
         [
            7,
            7
         ],
         [
            3,
            7
         ],
         [
            3,
            5
         ],
         [
            4,
            4
         ],
         [
            6,
            4
         ],
         [
            7,
            5
         ]
      ],
      [
         [
            3,
            6
         ],
         [
            4,
            5
         ],
         [
            6,
            5
         ],
         [
            7,
            6
         ]
      ]
   ],
   [
      [
         [
            7,
            2
         ],
         [
            5,
            2
         ],
         [
            4,
            1
         ]
      ],
      [
         [
            7,
            3
         ],
         [
            5,
            3
         ],
         [
            4,
            2
         ],
         [
            4,
            0
         ]
      ],
      [
         [
            7,
            4
         ],
         [
            5,
            4
         ],
         [
            4,
            3
         ],
         [
            4,
            1
         ],
         [
            5,
            0
         ],
         [
            7,
            0
         ]
      ],
      [
         [
            7,
            5
         ],
         [
            5,
            5
         ],
         [
            4,
            4
         ],
         [
            4,
            2
         ],
         [
            5,
            1
         ],
         [
            7,
            1
         ]
      ],
      [
         [
            7,
            6
         ],
         [
            5,
            6
         ],
         [
            4,
            5
         ],
         [
            4,
            3
         ],
         [
            5,
            2
         ],
         [
            7,
            2
         ]
      ],
      [
         [
            7,
            7
         ],
         [
            5,
            7
         ],
         [
            4,
            6
         ],
         [
            4,
            4
         ],
         [
            5,
            3
         ],
         [
            7,
            3
         ]
      ],
      [
         [
            4,
            7
         ],
         [
            4,
            5
         ],
         [
            5,
            4
         ],
         [
            7,
            4
         ]
      ],
      [
         [
            4,
            6
         ],
         [
            5,
            5
         ],
         [
            7,
            5
         ]
      ]
   ],
   [
      [
         [
            6,
            2
         ],
         [
            5,
            1
         ]
      ],
      [
         [
            6,
            3
         ],
         [
            5,
            2
         ],
         [
            5,
            0
         ]
      ],
      [
         [
            6,
            4
         ],
         [
            5,
            3
         ],
         [
            5,
            1
         ],
         [
            6,
            0
         ]
      ],
      [
         [
            6,
            5
         ],
         [
            5,
            4
         ],
         [
            5,
            2
         ],
         [
            6,
            1
         ]
      ],
      [
         [
            6,
            6
         ],
         [
            5,
            5
         ],
         [
            5,
            3
         ],
         [
            6,
            2
         ]
      ],
      [
         [
            6,
            7
         ],
         [
            5,
            6
         ],
         [
            5,
            4
         ],
         [
            6,
            3
         ]
      ],
      [
         [
            5,
            7
         ],
         [
            5,
            5
         ],
         [
            6,
            4
         ]
      ],
      [
         [
            5,
            6
         ],
         [
            6,
            5
         ]
      ]
   ]
]