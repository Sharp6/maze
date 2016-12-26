function MazeMaker(maze) {
  this.current;
  this.stack = [];
  this.visited = [];

  this.setupAlgo = function() {
    this.current = maze.grid[0];
    this.visited.push(this.current);
  }.bind(this);

  this.drawMaze = function() {
    var neighbors = maze.getNeightbors(this.current);
    // Eliminate visited neighbors
    neighbors = neighbors.filter(function(neighbor) {
      return this.visited.indexOf(neighbor) === -1;
      //return !neighbor.visited;
    }.bind(this));
    var next;
    if(neighbors.length > 0) {
      next = neighbors[Math.floor(Math.random() * neighbors.length)];
    };

    if(next) {
      this.stack.push(this.current);
      //console.log("Neigbors for cell", current.c, current.r, ": ", neighbors);
      //console.log("Current", current, "next", next);
      maze.removeWalls(this.current,next);
      this.current = next;
      this.visited.push(this.current);

      return false;
    } else {
      if(this.stack.length > 0) {
          this.current = this.stack.pop();
          return false;
      } else {
        return true;
      }
    }
  }.bind(this);
}
