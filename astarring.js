// Could a ES6 weakmap be used here?
function Map() {
    var keys = [], values = [];

    return {
        put: function (key, value) {
            var index = keys.indexOf(key);
            if(index == -1) {
                keys.push(key);
                values.push(value);
            }
            else {
                values[index] = value;
            }
        },
        get: function (key) {
            return values[keys.indexOf(key)];
        }
    };
}

function Astar() {
  //this.maze = maze;

  this.f = new Map();
  this.g = new Map();
  this.h = new Map();
  this.parent = new Map();

  this.openList = [];
  this.closedList = [];

  this.setup = function(maze, start, end) {
    this.maze = maze;

    this.start = start;
    this.end = end;

    this.openList.push(start);

    this.maze.grid.forEach(function(cell) {
      this.f.put(cell,0);
      this.g.put(cell,0);
      this.h.put(cell,0);
      this.parent.put(cell,null);
    }.bind(this));
  }.bind(this);

  this.update = function() {
    console.log("RUNNING ASTAR", this.openList);
    if(this.openList.length === 0) {
      // No succes, change state global
      console.log("ASTAR FAILED");
      state = "failed";
      return;
    }

    // Find the cell with lowest f
    var lowInd = 0;
    this.openList.forEach(function(node, index) {
      if(this.f.get(node) < this.f.get(lowInd)) {
        lowInd = index;
      }
    }.bind(this));
    var currentNode = this.openList[lowInd];

    // end case, end has been reached
    if(currentNode === this.end) {
      var curr = currentNode;
      var ret = [];
      while(this.parent.get(curr)) {
        ret.push(curr);
        curr = this.parent.get(curr);
      }

      console.log("ASTAR FINISHED");
      state = "finished";
      this.path = ret.reverse();
      return ret.reverse();
    }

    // Normal case
    this.openList.splice(this.openList.indexOf(currentNode), 1);
    this.closedList.push(currentNode);
    var neighbors = maze.getValidNeighbors(currentNode);

    neighbors.forEach(function(neighbor) {
        if(this.closedList.indexOf(neighbor) !== -1) {
          return;
        }
        var gScore = this.g.get(currentNode) + 1; // 1 is distance between two cells
        var gScoreIsBest = false;
        console.log("index", this.openList.indexOf(neighbor));
        if(this.openList.indexOf(neighbor) === -1) {
          gScoreIsBest = true;
          this.h.put(neighbor, this.heuristic(neighbor));
          console.log("Adding to openList", neighbor);
          this.openList.push(neighbor);
        } else if(gScore < this.g.get(neighbor)) {
          // better g
          gScoreIsBest = true;
        }

        if(gScoreIsBest) {
          this.parent.put(neighbor, currentNode);
          this.g.put(neighbor, gScore);
          this.f.put(neighbor, gScore + this.h.get(neighbor));
        }
    }.bind(this));
  }.bind(this);

  this.heuristic = function(cell) {
    return Math.abs(cell.c - this.end.c) + Math.abs(cell.r - this.end.r);
  }



}
