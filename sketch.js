// CONFIG
var config = {
  cellWidth: 40,
  width: 400,
  height: 400
}

// GLOBALS
var maze;
var player;
var solver;
var state;

var astar = new Astar();

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
  astar.setup(maze, maze.grid[0], maze.grid[(maze.cols*maze.rows) - 1]);
}

// DRAW
function draw() {
  //console.log(frameRate());
  background(51);
  maze.draw();
  actions[state]();
}

var actions = {
  drawingMaze: drawMaze,
  playing: playing,
  solving: solving,
  astarring: astar.update,
  finished: finished,
  failed: failed
};

function finished() {
  console.log("FINISHED");
  astar.path.forEach(function(solveCell) {
    solveCell.highlight();
  });
}

function failed() {
  //console.log("FAILED");
}
