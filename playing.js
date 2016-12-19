function setupPlayer() {
  player = new Player();
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
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

function playing() {
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
  } else {
    player.vel.mult(-2);
  }


  player.update();
  player.draw();
}
