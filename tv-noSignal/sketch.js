var array = [];
var r, c, size;
var song;

function preload() {
  song = loadSound("../Music/tv-nosignal.mp3");
}

function setup() {
  size = 5;
  r = floor((innerWidth - 30) / size);
  c = floor((innerHeight - 50) / size);
  width = r * size;
  height = c * size;
  createCanvas(width, height);
  background(0);
  noLoop();
  for (let i = 0; i < r; i++) {
    var row = [];
    for (let j = 0; j < c; j++) {
      row.push(new Rectangle(i * size, j * size));
    }
    array.push(row);
  }
  frameRate(5);
}

function draw() {
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (array[i][j]) {
        fill(random(255));
        noStroke();
        rect(i * size, j * size, size, size);
      }
    }
  }
  song.play();
}

class Rectangle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color;
    this.isVisible;
  }
  show() {}
  hide() {}
}
