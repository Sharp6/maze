function PlayerKeyboard() {
  this.setup = function() {
    player = new Mover();
  };

  this.update = function() {
    var cell = maze.getCellFor(player.pos);
    if(cell) {


      cell.highlight();
      ['top', 'bottom', 'left', 'right'].forEach(function(direction) {
        if(collideLineRect(cell.walls[direction].points[0].x,
          cell.walls[direction].points[0].y,
          cell.walls[direction].points[1].x,
          cell.walls[direction].points[1].y,
          Math.round(player.pos.x), Math.round(player.pos.y),
          player.width, player.height)) {
            if(cell.walls[direction].state) {
                console.log("BUMP", direction);
                player.vel.mult(-2);
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
              Math.round(player.pos.x), Math.round(player.pos.y),
              player.width, player.height)) {
                if(companionCell.walls[direction].state) {
                    console.log("BUMP", direction);
                    player.vel.mult(-2);
                }
              }
          });
      }
     } else {
      player.vel.mult(-2);
    }

    player.update();
    player.draw();
  };

}
