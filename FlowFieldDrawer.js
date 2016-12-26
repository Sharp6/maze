function FlowFieldDrawer(maze, astar) {
  this.setup = function() {
    if(astar.path) {
      astar.path.forEach(function(cell, index) {
        if(index < astar.path.length - 1) {
          var dir = maze.getDirectionFor(cell, astar.path[index+1]);
          var angle;
          switch (dir) {
            case "right":
              angle = 0;
              break;
            case "top":
              angle = PI*3/2;
              break;
            case "left":
              angle = PI;
              break;
            case "bottom":
              angle = PI/2;
              break;
            default:
          }
          var v = p5.Vector.fromAngle(angle);

          if(index > 0) {
            var prevDir = maze.getDirectionFor(astar.path[index-1], cell);
            var prevAngle;
            switch (prevDir) {
              case "right":
                prevAngle = 0;
                break;
              case "top":
                prevAngle = PI*3/2;
                break;
              case "left":
                prevAngle = PI;
                break;
              case "bottom":
                prevAngle = PI/2;
                break;
              default:
            }
            var prevV = p5.Vector.fromAngle(prevAngle);
            prevV.setMag(0.4);

            v.add(prevV);
          }

          v.setMag(0.4);
          cell.flowFieldVector = v;
        }
      });
    } else {
      console.log("ERR: no astar path");
    }
  }

  this.update = function() {
    return true;
  }
}
