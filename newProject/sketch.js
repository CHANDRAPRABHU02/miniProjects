var array = [];
var r, c, size;
var img;
function preload() {
  img = loadImage("../Pictures/nature-01.jpg");
}

function setup() {
  size = 20;
  r = floor((innerWidth - 30) / size);
  c = floor((innerHeight - 50) / size);
  width = r * size;
  height = c * size;
  noLoop();
  createCanvas(width, height);
  background(0);
  for (let i = 0; i < r; i++) {
    var row = [];
    for (let j = 0; j < c; j++) {
      row.push(new Rectangle(i * size, j * size));
    }
    array.push(row);
  }
  frameRate(40);
  fill(0);
  noStroke();
}

function draw() {
  var flag = true;
  image(img, 0, 0, width, height);
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (array[i][j].isVisible == false) {
        array[i][j].hide();
        if (flag) {
          array[i][j].isVisible = true;
          flag = false;
        }
      }
    }
  }
  array[floor(random(r))][floor(random(c))].isVisible = true;
}

class Rectangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isVisible = false;
  }
  show() {
    rect(this.x, this.y, size, size);
  }
  hide() {
    rect(this.x, this.y, size, size);
  }
}
