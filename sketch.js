// CONFIG
var config = {
  cellWidth: 20,
  width: 800,
  height: 600
}

// GLOBALS
var maze;
var player;
var solver;
var state;

// SETUP
function setup() {
  createCanvas(config.width,config.height);
  state = "drawingMaze";

  maze = new Maze({
    cols: Math.floor(config.width/config.cellWidth),
    rows: Math.floor(config.height/config.cellWidth),
    cellWidth: config.cellWidth
  });

  setupAlgo();
  setupSolver();
  setupPlayer();
}

// DRAW
function draw() {
  background(51);
  maze.draw();
  actions[state]();
}

var actions = {
  drawingMaze: drawMaze,
  playing: playing,
  solving: solving,
  finished: finished
};

function finished() {
  console.log("FINISHED");
  solvePath.forEach(function(solveCell) {
    solveCell.highlight();
  });
}
