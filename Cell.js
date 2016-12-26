function Cell(data) {
  this.c = data.c;
  this.r = data.r;
  this.width = data.width || 40;
  this.visited = data.visited || false;
  this.flowFieldVector = null;

  this.x = this.c * this.width;
  this.y = this.r * this.width;

  this.points = {
    tl: createVector(this.x, this.y),
    tr: createVector(this.x + this.width, this.y),
    bl: createVector(this.x, this.y + this.width),
    br: createVector(this.x + this.width, this.y + this.width)
  }

  this.walls = {
    top: new Wall({ points: [ this.points.tl, this.points.tr ] }),
    right: new Wall({ points: [ this.points.tr, this.points.br ] }),
    bottom: new Wall({ points: [ this.points.br, this.points.bl  ] }),
    left: new Wall({ points: [ this.points.bl, this.points.tl ] })
  }

  this.findWallDirection = function(wall) {
    for(var dir in this.walls) {
      if(wall === this.walls[dir]) {
        return dir;
      }
    }
  }

  this.draw = function() {
    stroke(255);
    for(var key of Object.keys(this.walls)) {
      this.walls[key].draw();
    };

    /*
    if(this.flowFieldVector) {
      //stroke(0,0,0,10);
      stroke(0);
			strokeWeight(1);
			push();
			translate(this.x + this.width/2, this.y + this.width/2);
			rotate(this.flowFieldVector.heading());
			line(0,0,this.width/2,0);
			pop();
    }
    */

    if(this.visited) {
      noStroke();
      fill(255, 0, 255, 50);
      //rect(this.x, this.y, this.width, this.width);
    }
  }

  this.highlight = function() {
    noStroke();
    fill(0,0,255,100);
    rect(this.x, this.y, this.width, this.width);
  }
}
