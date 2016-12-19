function Solver(data) {

  this.pos = createVector(10,10);
  this.width = 10;
  this.height = 10;

  this.update = function() {
  };

  this.moveToCell = function(cell) {
    this.pos.x = cell.x + (cell.width / 2) - this.width / 2;
    this.pos.y = cell.y + (cell.width / 2) - this.height / 2;
  }

  this.draw = function() {
    noStroke();
    fill(255, 255, 255);
    rect(this.pos.x, this.pos.y, this.width, this.height);
  };
}
