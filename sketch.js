// sketch.js

// globally scoped variables
let ballX, ballY, ballR;

function setup() {
	createCanvas(600, 600);
    frameRate(15);

    ballX = 200;
    ballY = 200;
    ballR = 10;

    let n = 10;

    for (let i = 10; i > 0; i -= 1) {
        let line = "";
        for (let j = 0; j < i; j += 1) {
            line += j;
        }
        print(line);
    }
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
    
    strokeWeight(1);
    ellipse(ballX, ballY, ballR * 2, ballR * 2);

    noLoop();
}
