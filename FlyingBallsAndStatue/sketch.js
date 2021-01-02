var array = [];

function setup() {
  createCanvas(600, 400);
  background(0);
}

function draw() {
  background(0);
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      array[i].statue(array[j]);
    }
    fill(array[i].color[0], array[i].color[1], array[i].color[2]);
    circle(array[i].x, array[i].y, array[i].r);
    array[i].move();
  }
}

class Circle {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.r = random(10, 50);
    (this.color = [random(255), random(255), random(255)]),
      (this.maxHeight = this.y);
    this.updateYPositive = true;
    this.upX = random(6) - 3;
    this.upY = random(6) - 3;
  }
  move() {
    this.x += this.upX;
    this.y += this.upY;
    if (this.x < 0 || this.x > width) {
      this.upX = -this.upX;
      this.x += this.upX;
    }
    if (this.y < 0 || this.y > height) {
      this.upY = -this.upY;
      this.y += this.upY;
    }
  }
  intersect(other) {
    var distance = dist(this.x, this.y, other.x, other.y);
    return distance <= (this.r + other.r) / 2;
  }
  statue(other) {
    if (!other || this.intersect(other)) {
      this.upX = 0;
      this.upY = 0;
      this.color = [100, 100, 100];
      if (other) other.statue();
    }
  }
}

function mousePressed() {
  array.push(new Circle());
}
