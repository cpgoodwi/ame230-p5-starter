// sketch.js

// globally scoped variables
let ballX, ballY, ballR;
let ball1, ball2;

function setup() {
	createCanvas(600, 800);
    frameRate(15);

    ballX = 200;
    ballY = 200;
    ballR = 10;

    ball1 = new Ball(200, 200, 10);
    ball2 = new Ball(300, 200, 50);

    let n = 10;

    for (let i = 10; i > 0; i -= 1) {
        let line = "";
        for (let j = 0; j < i; j += 1) {
            line += j;
        }
        print(line);
    }

    print(
        add(3, 13) + 5
    );
}

function draw() {
	background(128);

    ballX = mouseX; 
    ballY = mouseY;

    if (ballX < 200) {
        background("red");
    } else if (ballX >= 200 && ballX < 400) {
        background("green");
    } else {
        background("blue");
    }

    drawGrid();
    
    strokeWeight(1);
    ellipse(ballX, ballY, ballR * 2, ballR * 2);

    drawTriangle(300, 300);
    drawTriangle(400, 300);
    drawTriangle(300, 400);

    ball1.move();
    ball1.render();

    ball2.move();
    ball2.render();

    // noLoop();
}

function drawGrid() {
    const grid = 50;
    // vertical lines while loop
    let x = 0;
    while (x < width) {
        stroke(100);
        line(x, 0, x, height);
        x += grid;
    }

    // horizontal lines for loop
    for (let y = 0; y < height; y += grid) {
        stroke(100);
        line(0, y, width, y);
    }
}

function drawTriangle(x, y) {
    const radius = 10;

    beginShape();
    vertex(x, y - radius);
    vertex(x + radius, y + radius);
    vertex(x - radius, y + radius);
    endShape(CLOSE);
}

function add(num1, num2) {
    // let sum = num1 + num2;
    return num1 + num2;
}

class Ball {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    move() {
        this.y -= 1;
    }

    render() {
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}
