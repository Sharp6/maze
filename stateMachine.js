// CONFIG
var config = {
  cellWidth: 40,
  width: 400,
  height: 400
}

// GLOBALS
var maze;
var player;
var enemy;
var solver;
var state;
var stateCounter;

var mazeMaker;
var flowFieldDrawer;
var astar;
var playerFollower;
var playerKeyboard;

// SETUP
function setup() {
  createCanvas(config.width,config.height);
  stateCounter = 0;


  maze = new Maze({
    cols: Math.floor(config.width/config.cellWidth),
    rows: Math.floor(config.height/config.cellWidth),
    cellWidth: config.cellWidth
  });

  mazeMaker = new MazeMaker(maze);
  astar = new Astar(maze);
  flowFieldDrawer = new FlowFieldDrawer(maze, astar);
  playerFollower = new PlayerFollower(astar);
  playerKeyboard = new PlayerKeyboard();

  bootstrapState = {
    setup: function() {},
    update: function() { return true; }
  }

  makerState = {
    setup: mazeMaker.setupAlgo,
    update: mazeMaker.drawMaze
  }

  aStarState = {
    setup: astar.setup,
    update: astar.update
  }

  finishedState = {
    setup: function() {},
    update: function finished() {
      //console.log("FINISHED");
    }
  }

  flowFieldDrawerState = {
    setup: flowFieldDrawer.setup,
    update: flowFieldDrawer.update
  }

  playerFollowerState = {
    setup: playerFollower.setup,
    update: playerFollower.update
  }

  playerKeyboardState = {
    setup: playerKeyboard.setup,
    update: playerKeyboard.update
  }

  playingState = {
    setup: function() {
      playerKeyboardState.setup();
      playerFollowerState.setup();
    },
    update: function() {
      playerKeyboardState.update();
      playerFollowerState.update();
    }
  }

  states = [ bootstrapState, makerState, aStarState, flowFieldDrawerState, playingState, finishedState ];

  //setupAlgo();
  //setupSolver();
  //setupPlayer();
  //astar.setup(maze, maze.grid[0], maze.grid[(maze.cols*maze.rows) - 1]);
}

// DRAW
function draw() {
  //console.log(frameRate());
  background(51);
  maze.draw();

  /*if(astar.path) {
    astar.path.forEach(function(solveCell) {
      solveCell.highlight();
    });
  }*/

  if(states[stateCounter].update()) {
    // do state transition
    stateCounter++;
    console.log("Doing the state transition to", stateCounter);
    states[stateCounter].setup();
  };
}

/*
var actions = {
  drawingMaze: drawMaze,
  playing: playing,
  solving: solving,
  astarring: astar.update,
  finished: finished,
  failed: failed
};

function failed() {
  //console.log("FAILED");
}
*/

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      console.log("GOING LEFT");
      player.acc.add(createVector(-1,0));
      break;
    case DOWN_ARROW:
      player.acc.add(createVector(0,1));
      break;
    case UP_ARROW:
      player.acc.add(createVector(0,-1));
      break;
    case RIGHT_ARROW:
      player.acc.add(createVector(1,0));
      break;
    default:
  }
}
