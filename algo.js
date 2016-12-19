// ALGO
var current;
var stack = [];
var visited = [];

var setupAlgo = function() {
  current = maze.grid[0];
  visited.push(current);
}

var drawMaze = function() {
  var neighbors = maze.getNeightbors(current);
  // Eliminate visited neighbors
  neighbors = neighbors.filter(function(neighbor) {
    return visited.indexOf(neighbor) === -1;
    //return !neighbor.visited;
  });
  var next;
  if(neighbors.length > 0) {
    next = neighbors[Math.floor(Math.random() * neighbors.length)];
  };

  if(next) {
    stack.push(current);
    //console.log("Neigbors for cell", current.c, current.r, ": ", neighbors);
    //console.log("Current", current, "next", next);
    maze.removeWalls(current,next);
    current = next;
    visited.push(current);
  } else {
    if(stack.length > 0) {
        current = stack.pop();
    } else {
      state = "solving";
    }
  }
};
