// sketch.js

let ball = {
    x: 300,
    y: 300,
    radius: 20,
    velocityX: 3,
    velocityY: -5,
    hue: 180,
};

let ballBox = {
    leftWall: 100,
    topWall: 100,
};

function setup() {
	createCanvas(600, 600);

    frameRate(45);

    colorMode(HSB, 360, 100, 100);

    ballBox.rightWall = width - 100;
    ballBox.bottomWall = height - 100;
}

function draw() {
    drawBackground();
    moveBall(0, 1); // these params mean the ball will bounce normally with no gravity and no loss of momentum
    drawBall();

    // noLoop();
}

function drawBackground() {
    background(0, 0, 50);
    // use the x and y values of the ball to change the hue of the background
    let newHue = 360 * atan2(ball.y - height/2, ball.x - width/2) / (2 * PI);
    newHue = newHue < 0 ? newHue + 360 : newHue;
	fill(newHue, 100, 100);
    rectMode(CORNERS);
    rect(
        ballBox.leftWall, ballBox.topWall,
        ballBox.rightWall, ballBox.bottomWall
    );
}

function moveBall(gravity = 1, bounce = 0.8) {

    ball.velocityY += gravity;


    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.x + ball.radius > ballBox.rightWall) {
        changeColor();
        ball.velocityX *= -1 * bounce;
        ball.x = ballBox.rightWall - ball.radius;
    } else if (ball.x - ball.radius < ballBox.leftWall) {
        changeColor();
        ball.velocityX *= -1 * bounce;
        ball.x = ballBox.leftWall + ball.radius;
    }

    if (ball.y + ball.radius > ballBox.bottomWall) {
        changeColor();
        ball.velocityY *= -1 * bounce;
        ball.y = ballBox.bottomWall - ball.radius;
    } else if (ball.y - ball.radius < ballBox.topWall) {
        changeColor();
        ball.velocityY *= -1;
        ball.y = ballBox.topWall + ball.radius;
    }
}

function changeColor() {
    ball.hue = random(360);
}

function drawBall() {
    fill(
        ball.hue,
        100,
        100
    );
    stroke(0);
    strokeWeight(2);
    ellipse(
        ball.x, ball.y,
        ball.radius * 2, ball.radius * 2
    );
}
