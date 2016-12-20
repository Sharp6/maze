function setupSolver() {
  solver = new Solver();
  solveStack.push(maze.grid[0,0]);
}

var solveStack = [];
var solvePath = [];
var solveVisited = [];
var solveCurrent;

function solving() {
  solveCurrent = solveStack[solveStack.length - 1];
  solvePath.push(solveCurrent);
  solveVisited.push(solveCurrent);

  solver.moveToCell(solveCurrent);

  if(solveCurrent === maze.grid[maze.cols * (maze.rows - 1)]) {
    console.log(solvePath);

    state = "finished";
  }

  var unvisited = 0;

  var possibleCellsToMoveTo = Object.values(solveCurrent.walls).filter(function(wall) {
    return !wall.state;
  })
  .map(function(wall) {
    return solveCurrent.findWallDirection(wall);
  })
  .map(function(dir) {
    return maze.getNeighbor(solveCurrent,dir);
  });

  possibleCellsToMoveTo.forEach(function(cell) {
    if(solveVisited.indexOf(cell) === -1) {
      solveStack.push(cell);
      unvisited++;
    }
  });

  if(unvisited === 0) {
    solveStack.pop();
  }

  //var randomCell = possibleCellsToMoveTo[Math.floor(Math.random() * possibleCellsToMoveTo.length)];

  solver.update();
  solver.draw();
}
