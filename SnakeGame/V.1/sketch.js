alert(
  "Welcome to the game !!! , use  arrows to control the snake,use (s,m,f) to change the speed of the snake,after catching the food the speed resets to current speed";
);


var isFill = [],
  snakeBody = [[0, 0]],
  controlButtons = [];
const scale = 20;
var headX = 0,
  headY = 0,
  updateX = 1,
  updateY = 0,
  foodX,
  foodY,
  score = 0;

function setup() {
  createCanvas(
    floor((innerWidth - 30) / scale) * scale,
    floor((innerHeight - 30) / scale) * scale
  );
  background(0);
  height -= 5 * scale;
  for (let i = 0; i < width; i += scale) {
    var eachRow = [];
    for (let j = 0; j < height; j += scale) {
      eachRow.push(false);
    }
    isFill.push(eachRow);
  }
  stroke(255);
  line(0, height, width, height);
  noStroke();
  frameRate(5);
  foodX = floor(random(0, width));
  foodY = floor(random(0, height));
  drawFood();
  for (let i = 0; i < 4; i++) {
    controlButtons.push(
      new Controls((i * width) / 4 + width / 8, height + scale, "v˄<>"[i], i)
    );
  }
}
function mousePressed() {
  for (let i = 0; i < 4; i++) {
    controlButtons[i].clicked();
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    updateX = 0;
    updateY = 1;
  } else if (keyCode == UP_ARROW) {
    updateX = 0;
    updateY = -1;
  } else if (keyCode == LEFT_ARROW) {
    updateX = -1;
    updateY = 0;
  } else if (keyCode == RIGHT_ARROW) {
    updateX = 1;
    updateY = 0;
  } else if (key == "s") {
    noLoop();
  }
}

function draw() {
  headX += updateX;
  headY += updateY;
  if (headX < 0) {
    headX = width / scale - 1;
  } else if (headX >= width / scale) {
    headX = 0;
  } else if (headY < 0) {
    headY = height / scale - 1;
  } else if (headY >= height / scale) {
    headY = 0;
  }
  if (isFill[headX][headY]) {
    endGame();
    return;
  }
  if (headX == foodX && headY == foodY) {
    drawFood();
    score += snakeBody.length;
    if (score > 200) {
      frameRate(25);
    } else if (score > 100) {
      frameRate(20);
    } else if (score > 30) {
      frameRate(15);
    } else if (score > 10) {
      frameRate(10);
    } else {
      frameRate(8);
    }
  } else {
    removeTail();
  }
  fill(255);
  drawPart(headX, headY);
  snakeBody.push([headX, headY]);
  isFill[headX][headY] = true;
}

function drawPart(x, y) {
  rect(x * scale, y * scale, 15, 15, 7);
}
function removePart(x, y) {
  fill(0);
  rect(x * scale, y * scale, 15, 15);
}
function drawFood() {
  fill(255, 0, 0);
  do {
    foodX = floor(random(0, width / scale));
    foodY = floor(random(0, height / scale));
  } while (isFill[foodX][foodY]);
  drawPart(foodX, foodY);
}

function removeTail() {
  const tailToBeDeleted = snakeBody.shift();
  removePart(tailToBeDeleted[0], tailToBeDeleted[1]);
  isFill[tailToBeDeleted[0]][tailToBeDeleted[1]] = false;
}

class Snake {
  constructor(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

class Controls {
  constructor(newX, newY, label, val) {
    this.x = newX - 15;
    this.y = newY + 15;
    this.w = 30;
    this.h = 30;
    this.val = val;
    fill(100);
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    text(label, this.x + 12, this.y + 17);
  }
  clicked() {
    if (
      this.x <= mouseX &&
      mouseX <= this.x + this.w &&
      this.y <= mouseY &&
      mouseY <= this.y + this.h
    ) {
      if (this.val == 0) {
        updateX = 0;
        updateY = 1;
      } else if (this.val == 1) {
        updateX = 0;
        updateY = -1;
      } else if (this.val == 2) {
        updateX = -1;
        updateY = 0;
      } else if (this.val == 3) {
        updateX = 1;
        updateY = 0;
      }
    }
  }
}

function endGame() {
  background(255, 0, 0);
  textSize(32);
  text("You Lost !!!", width / 3, height / 3);
  text("Your Score is " + score, width / 3, height / 3 + 40);
  noLoop();
}
