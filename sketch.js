// sketch.js

let ball = {
    x: 300,
    y: 300,
    radius: 20,
    velocityX: 3,
    velocityY: 5,
};

let leftWall, rightWall, topWall, bottomWall;

function setup() {
	createCanvas(600, 600);

    frameRate(24);

    colorMode(HSB, 360, 100, 100);

    leftWall = 0;
    rightWall = width;
    topWall = 0;
    bottomWall = height;
}

function draw() {
    drawBackground();
    moveBall(5);
    drawBall();

    // noLoop();
}

function drawBackground() {
    // use the x and y values of the ball to change the hue of the background
    let newHue = 360 * atan2(ball.y - height/2, ball.x - width/2) / (2 * PI);
    newHue = newHue < 0 ? newHue + 360 : newHue;
	background(newHue, 100, 100);
}

function moveBall() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.x + ball.radius > rightWall) {
        changeColor();
        ball.velocityX *= -1;
        ball.x = rightWall - ball.radius;
    } else if (ball.x - ball.radius < leftWall) {
        changeColor();
        ball.velocityX *= -1;
        ball.x = leftWall + ball.radius;
    }

    if (ball.y + ball.radius > bottomWall) {
        changeColor();
        ball.velocityY *= -1;
        ball.y = bottomWall - ball.radius;
    } else if (ball.y - ball.radius < topWall) {
        changeColor();
        ball.velocityY *= -1;
        ball.y = topWall + ball.radius;
    }
}

function changeColor() {
    let newHue = random(360);
    print(newHue);
    fill(
        newHue,
        100,
        100
    );
}

function drawBall() {
    stroke(0);
    strokeWeight(2);
    ellipse(
        ball.x, ball.y,
        ball.radius * 2, ball.radius * 2
    );
}
