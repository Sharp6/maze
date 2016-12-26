function PlayerFollower(astar) {
  this.setup = function() {
    // Auch, global
    enemy = new Mover();
  };

  this.update = function() {
    var cell = maze.getCellFor(enemy.pos);

    if(cell) {
      enemy.follow(cell);
      //cell.highlight();
      ['top', 'bottom', 'left', 'right'].forEach(function(direction) {
        if(collideLineRect(cell.walls[direction].points[0].x,
          cell.walls[direction].points[0].y,
          cell.walls[direction].points[1].x,
          cell.walls[direction].points[1].y,
          Math.round(enemy.pos.x), Math.round(enemy.pos.y),
          enemy.width, enemy.height)) {
            if(cell.walls[direction].state) {
                console.log("BUMP", direction);
                enemy.vel.mult(-2);
            }
          }
      });

      var companionCell = maze.getNeighbor(cell,"bottomright");
      if(companionCell) {
          companionCell.highlight();
          ['top', 'bottom', 'left', 'right'].forEach(function(direction) {
            if(collideLineRect(companionCell.walls[direction].points[0].x,
              companionCell.walls[direction].points[0].y,
              companionCell.walls[direction].points[1].x,
              companionCell.walls[direction].points[1].y,
              Math.round(enemy.pos.x), Math.round(enemy.pos.y),
              enemy.width, enemy.height)) {
                if(companionCell.walls[direction].state) {
                    console.log("BUMP", direction);
                    enemy.vel.mult(-2);
                }
              }
          });
      }

    } else {
      enemy.vel.mult(-2);
    }

    enemy.update();
    enemy.draw();

    if(cell === astar.end) {
        return true;
    } else {
        return false;
    }

  };
}
