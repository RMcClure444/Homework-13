let playerX = 50;
let playerY = 200;
let playerSize = 20;
let speed = 3;

//moving obstacles
let obstacles = [];

//non-moving
let staticObstacles = [];

// exit
let exitX = 350;
let exitY = 170;
let exitW = 40;
let exitH = 60;

let win = false;

function setup() {
  createCanvas(400, 400);

  //5 obstacles
  for (let i = 0; i < 6; i++) {
    obstacles.push({
      x: random(width),
      y: random(height),
      w: random(20, 60),
      h: random(20, 60),
      dx: random(-2, 2),
      dy: random(-2, 2),
      c: [random(255), random(255), random(255)]
    });
  }
}

function draw() {
  background(220);

  //player movement 
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += speed;
  }
  if (keyIsDown(UP_ARROW)) {
    playerY -= speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerY += speed;
  }

  // player
  fill(0, 200, 100);
  ellipse(playerX, playerY, playerSize);

  //draw obstacles
  for (let o of obstacles) {
    moveObstacle(o);
    drawObstacle(o);
  }

  //mouse obstacles
  fill(150);
  for (let s of staticObstacles) {
    rect(s.x, s.y, s.w, s.h);
  }

  //exit
  fill(255, 200, 0);
  rect(exitX, exitY, exitW, exitH);

  //win 
  if (
    playerX > exitX &&
    playerX < exitX + exitW &&
    playerY > exitY &&
    playerY < exitY + exitH
  ) {
    win = true;
  }

  //text
  fill(0);
  textAlign(CENTER);

  if (win) {
    textSize(24);
    text("YOU WIN!", width / 2, height / 2);
  } else {
    textSize(14);
    text("Reach the yellow exit!", width / 2, 20);
  }
}

//functions

function moveObstacle(o) {
  o.x += o.dx;
  o.y += o.dy;

  //screen
  if (o.x > width) o.x = 0;
  if (o.x < 0) o.x = width;
  if (o.y > height) o.y = 0;
  if (o.y < 0) o.y = height;
}

function drawObstacle(o) {
  fill(o.c[0], o.c[1], o.c[2]);
  rect(o.x, o.y, o.w, o.h);
}

//mouse clicking
function mousePressed() {
  staticObstacles.push({
    x: mouseX,
    y: mouseY,
    w: 50,
    h: 50
  });
}