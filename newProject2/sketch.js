var inc = 0,
  x = 0;
function setup() {
  createCanvas(700, 500);
  frameRate(3);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(2);
  beginShape();
  noFill();
  for (let i = 0; i < width; i += 10) {
    x = noise(inc + i / 10) * height;
    vertex(i, x);
  }
  inc += 1;
  endShape();
  //noLoop();
}

function keyPressed() {
  if (key == "s") noLoop();
}
