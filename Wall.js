function Wall(data) {
  this.state = data.state || true;
  this.points = data.points;

  this.draw = function() {
    stroke(255);
    if(this.state) {
        line(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
    }
  }
}
