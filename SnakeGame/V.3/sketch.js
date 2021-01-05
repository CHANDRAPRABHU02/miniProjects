alert(
  "Welcome to the game !!! , Here the bot controls the snake,use (s,m,f) to change the speed of the snake,"
);
var isFill = [],
  snakeBody = [[0, 0]],
  controlButtons = [],
  CheatCodeForLengthExtention = false,
  dir = [-1, 0, 1];
const scale = 20;
var headX = 0,
  headY = 0,
  updateX = 1,
  updateY = 0,
  foodX,
  foodY,
  score = 0,
  movesCount = 0;

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
  frameRate(80);
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
  } else if (key == "f") {
    frameRate(120);
  } else if (key == "s") {
    frameRate(4);
  } else if (key == "m") {
    frameRate(30);
  } else if (key == " ") {
    CheatCodeForLengthExtention = !CheatCodeForLengthExtention;
  } else if (key == "t" && false) {
    noLoop();
    background(0);
    fill(100);
    for (let i = 0; i < isFill.length; i++) {
      for (let j = 0; j < isFill[0].length; j++) {
        if (isFill[i][j]) drawPart(i, j);
      }
    }
  }
}

function draw() {
  BOT();
  headX += updateX;
  headY += updateY;
  if (headX < 0) {
    headX = isFill.length - 1;
  } else if (headX >= isFill.length) {
    headX = 0;
  } else if (headY < 0) {
    headY = isFill[0].length - 1;
  } else if (headY >= isFill[0].length) {
    headY = 0;
  }
  if (isFill[headX][headY]) {
    endGame();
    return;
  }
  if (headX == foodX && headY == foodY) {
    drawFood();
    score += snakeBody.length;
    /*if (score > 500) {
      frameRate(60);
    }
    if (score > 200) {
      frameRate(35);
    } else if (score > 100) {
      frameRate(20);
    } else if (score > 30) {
      frameRate(15);
    } else if (score > 10) {
      frameRate(10);
    } else {
      frameRate(8);
    }*/
  } else {
    removeTail();
  }
  fill(255);
  drawPart(headX, headY);
  snakeBody.push([headX, headY]);
  isFill[headX][headY] = true;
  // if (movesCount == 15) {
  //   createBlocks();
  //   movesCount = 0;
  // } else movesCount++;
}

function BOT() {
  if (snakeBody.length > 10 || snakeBody.length % 2 == 0) {
    poorWay();
  } else if (headX != foodX) {
    if (headX > foodX) {
      updateX = -1;
      updateY = 0;
    } else {
      updateX = 1;
      updateY = 0;
    }
  } else if (headY != foodY) {
    if (headY > foodY) {
      updateX = 0;
      updateY = -1;
    } else {
      updateX = 0;
      updateY = 1;
    }
  }
  let counter = 0;
  if (isFill[modx(headX + updateX)][mody(headY + updateY)]) {
    // console.log("B:", updateX, updateY);
    // if (updateX) updateX = -updateX;
    // else updateY = -updateY;
    // console.log("A:", updateX, updateY);
    // if (isFill[modx(headX + updateX)][mody(headY + updateY)]) {
    //   if (updateX) {
    //     updateX = 0;
    //     updateY = -1;
    //   } else {
    //     updateX = -1;
    //     updateY = 0;
    //   }
    // }
    //console.log("WARNING");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (abs(dir[i] + dir[j]) != 1) continue;
        if (isFill[modx(headX + dir[i])][mody(headY + dir[j])] == false) {
          updateX = dir[i];
          updateY = dir[j];
          log(i, j);
          i = 3;
          break;
        }
      }
    }
    //console.log("UP", headX, headY, updateX, updateY);
  }
  if (false)
    while (isFill[headX + updateX][headY + updateY] && counter < 10) {
      updateY++;
      if (updateY == 2) {
        updateX++;
        updateY = -1;
      }
      counter++;
    }
}

function poorWay() {
  if (headX == isFill.length - 1) {
    if (isFill.length & 1) {
      if (headY == 0) {
      } else if (headY == isFill[0].length - 1) {
        updateX = -1;
        updateY = 0;
      } else {
        updateX = 0;
        updateY = -1;
      }
    } else {
      if (headY == isFill[0].length - 1) {
        updateX = -1;
        updateY = 0;
      } else {
        updateX = 0;
        updateY = 1;
      }
    }
  } else if (
    headY == isFill[0].length - 1 &&
    headX + 1 < foodX &&
    headX + 1 < snakeBody[0][0]
  ) {
    updateX = 0;
    updateY = -1;
  } else if (
    isFill[headX + 1][headY] == false &&
    checkCondition(/*headX + 3 + (snakeBody.length + 100) / height, foodX*/) &&
    headY != isFill[0].length - 1
  ) {
    updateX = 1;
    updateY = 0;
  } else if (headX == 0) {
    if (headY == 0) {
      updateX = 1;
      updateY = 0;
    } else {
      updateX = 0;
      updateY = -1;
    }
  } else if (headY == 0) {
    if ((headX & 1) == 1) {
      updateX = 0;
      updateY = 1;
    } else {
      updateX = 1;
      updateY = 0;
    }
  } else if (headY == isFill[0].length - 2) {
    if (isFill[headX][headY + 1] == false && headX > foodX) {
      updateX = 0;
      updateY = 1;
    } else if ((headX & 1) == 1) {
      updateX = 1;
      updateY = 0;
    } else {
      updateX = 0;
      updateY = -1;
    }
  } else if (headY == isFill[0].length - 1) {
    updateX = -1;
    updateY = 0;
  } else if ((headX & 1) == 1) {
    updateX = 0;
    updateY = 1;
  } else {
    updateX = 0;
    updateY = -1;
  }
}

function drawPart(x, y, radius = 7) {
  rect(x * scale, y * scale, 15, 15, radius);
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
  if (CheatCodeForLengthExtention) {
    return;
  }
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
function checkCondition(a, b) {
  // if (a < headX && a > foodX) return false;
  //console.log(a, b);
  //return a < b || (headX > b && modx(a) > headX);
  if (headX + 1 == foodX) {
    return headY < foodY == (headX % 2 == 0);
  }
  if (foodX == headX) return false;
  //if (snakeBody.length < isFill.length + isFill.length) return true;
  // if (snakeBody[0][1] == isFill[0].length - 1) return true;
  if (foodX < headX && snakeBody[0][0] < headX) return (headX & 1) == 0;
  return snakeBody[0][0] != headX + 1 && snakeBody[0][0] != headX;
}

function createBlocks() {
  var BlockX = floor(random(0, width / scale));
  var BlockY = floor(random(0, height / scale));
  while (isFill[BlockX][BlockY]) {
    BlockX = floor(random(0, width / scale));
    BlockY = floor(random(0, height / scale));
  }
  isFill[BlockX][BlockY] = true;
  fill(100);
  drawPart(BlockX, BlockY, 0);
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
  noLoop();
  return;
  background(255, 0, 0);
  textSize(32);
  text("You Lost !!!", width / 3, height / 3);
  text("Your Score is " + score, width / 3, height / 3 + 40);
  noLoop();
}

function modx(x) {
  if (x < 0) x += isFill.length;
  if (x < isFill.length) return x;
  return x - isFill.length;
}
function mody(x) {
  if (x < 0) x += isFill[0].length;
  if (x < isFill[0].length) return x;
  return x - isFill[0].length;
}
