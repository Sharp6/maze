function Maze(data) {
  this.cols = data.cols || 30;
  this.rows = data.rows || 30;
  this.cellWidth = data.cellWidth;

  this.grid = [];

  for(var r = 0; r < this.rows; r++) {
    for(var c = 0; c < this.cols; c++) {
      var cell = new Cell({c: c, r: r, width: this.cellWidth});
      this.grid.push(cell);
    }
  }

  //console.log("Maze created with", this.cols, "cols and", this.rows, "rows resulting in a grid with", this.grid.length, "cells.");

  this.getNeightbors = function(cell) {
    var cellIndex = this.grid.indexOf(cell);

    var neighbors = [];

    // Add neighbors which are not edge cases
    if(cell.r !== 0) {
      neighbors.push(this.grid[cellIndex - this.cols]);
    }
    if(cell.r !== this.rows - 1) {
      neighbors.push(this.grid[cellIndex + this.cols]);
    }
    if(cell.c !== 0) {
      neighbors.push(this.grid[cellIndex - 1]);
    }
    if(cell.c !== this.cols - 1) {
      neighbors.push(this.grid[cellIndex + 1]);
    }

    //console.log("Neighbors for cell", cell.c, cell.r, "are", neighbors);
    return neighbors;
  };

  this.getValidNeighbors = function(cell) {
    var possibleCellsToMoveTo = Object.values(cell.walls).filter(function(wall) {
      return !wall.state;
    })
    .map(function(wall) {
      return cell.findWallDirection(wall);
    })
    .map(function(dir) {
      return this.getNeighbor(cell,dir);
    }.bind(this));

    return possibleCellsToMoveTo;
  }.bind(this);

  this.getNeighbor = function(cell,direction) {
    var cellIndex = this.grid.indexOf(cell);
    var cellDelta;
    switch (direction) {
      case "top":
        cellDelta = -this.cols;
        break;
      case "bottom":
        cellDelta = this.cols;
        break;
      case "left":
        cellDelta = -1;
        break;
      case "right":
        cellDelta = 1;
        break;
      case "bottomright":
        cellDelta = this.cols + 1;
        break;
      default:
        cellDelta = 0;
    }
    return this.grid[cellIndex + cellDelta];
  };

  this.getDirectionFor = function(cellFrom, cellTo) {
    var cellFromIndex = this.grid.indexOf(cellFrom);
    var cellToIndex = this.grid.indexOf(cellTo);

    var diff = cellToIndex - cellFromIndex;
    var dir;
    switch (diff) {
      case -1:
        dir = "left";
        break;
      case 1:
        dir = "right";
        break;
      case -this.cols:
        dir = "top";
        break;
      case this.cols:
        dir = "bottom";
        break;
      default:
        dir = "err";
    }
    return dir;
  }

  this.getCellFor = function(vector) {
    var c = Math.floor(vector.x/this.cellWidth);
    var r = Math.floor(vector.y/this.cellWidth);

    return this.grid[c + r * this.cols];
  }

  this.removeWalls = function(a, b) {
    var diff = this.grid.indexOf(a) - this.grid.indexOf(b);
    //console.log("Removing walls for cell", a.c, a.r, "and cell", b.c, b.r, " which have a diff of", diff);
    switch (diff) {
      case 1:
        a.walls.left.state = false;
        b.walls.right.state = false;
        break;
      case -1:
        a.walls.right.state = false;
        b.walls.left.state = false;
        break;
      case this.cols:
        a.walls.top.state = false;
        b.walls.bottom.state = false;
        break;
      case -this.cols:
        a.walls.bottom.state = false;
        b.walls.top.state = false;
        break;
      default:
        console.log("ERROR ERROR ERROR no valid walls removed.");
    }
  }

  this.draw = function() {
    this.grid.forEach(function(cell) {
      cell.draw();
    });
  }
}
