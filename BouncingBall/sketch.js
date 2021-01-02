var array = [];

function setup() {
  createCanvas(screen.width - screen.width / 10, 400);
  background(0);
}

function draw() {
  // return;
  background(0);
  // circle(40, 50, 60, 40);
  array.forEach((i) => {
    fill(i.color[0], i.color[1], i.color[2]);
    circle(i.x, i.y, i.r, i.r);
    i.gravitypull();
  });
}

class Circle {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.r = random(10, 50);
    (this.color = [random(255), random(255), random(255)]),
      (this.maxHeight = this.y);
    this.updateYPositive = true;
  }
  gravitypull() {
    if (this.maxHeight + 10 > height) return;
    var updateYvalue = 1;
    if (this.y > height) {
      updateYvalue = (this.y / 40) * 1.2;
      this.updateYPositive = false;
      this.maxHeight += 10;
    } else if (this.y < this.maxHeight) this.updateYPositive = true;
    else {
      updateYvalue = (this.y / 40) * 1.2;
    }
    if (this.updateYPositive) {
      if (updateYvalue < 0) this.y += 1;
      else this.y += updateYvalue;
    } else {
      if (updateYvalue < 0) this.y -= 1;
      else this.y -= updateYvalue;
    }
  }
}

function mousePressed() {
  // circle(mouseX, mouseY, 30, 30);
  array.push(new Circle());
}
