class Bubble {
  constructor() {
    this.radius = random(40, 60);
    this.position = createVector(
      random(this.radius / 2, width - this.radius / 2),
      random(this.radius / 2, height - this.radius / 2),
    );
    this.vector = createVector(random(-3, 3), random(-3, 3));
  }

  update() {
    this.position.add(this.vector);
    if (
      this.position.x + this.radius / 2 >= width ||
      this.position.x - this.radius / 2 <= 0
    )
      this.vector.x *= -1;
    if (
      this.position.y + this.radius / 2 >= height ||
      this.position.y - this.radius / 2 <= 0
    )
      this.vector.y *= -1;
  }

  show() {
    noFill();
    stroke(255, 0, 0);
    ellipse(this.position.x, this.position.y, this.radius, this.radius);
  }
}
