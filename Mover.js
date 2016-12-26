function Mover(data) {
  console.log("Mover created");
  this.pos = createVector(10,10);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.width = 10;
  this.height = 10;

  this.maxSpeed = 4;

  this.update = function() {
    var drag = this.vel.copy();
    drag.mult(-0.2);
    this.acc.add(drag);

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.draw = function() {
    noStroke();
    fill(255, 255, 255);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }

  this.applyForce = function(force) {
		this.acc.add(force);
	}.bind(this);

  this.follow = function(cell) {
    if(cell.flowFieldVector) {
      this.applyForce(cell.flowFieldVector);
    }
	}.bind(this);
}
