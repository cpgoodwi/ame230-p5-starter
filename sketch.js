// sketch.js

// global variables
let positionX = 300;
let positionY = 300;
let radius = 40;
let velocityX = 10;
let velocityY = 15;
let gravity = 1;

function setup() {
	createCanvas(600, 600);

}

function draw() {
	background(128);

    if (mouseX < 300 && mouseY < 300) {
        fill("peachpuff");
        noStroke();
        rect(
            0, 0,
            300, 300
        );
    } else if (mouseX > 300 && mouseY < 300) {
        fill("blue");
        noStroke();
        rect(
            300, 0,
            300, 300
        );
    } else if (mouseX > 300 && mouseY > 300) {
        fill("chartreuse");
        noStroke();
        rect(
            300, 300,
            300, 300
        );
    } else {
        fill("cornsilk");
        noStroke();
        rect(
            0, 300,
            300, 300
        );
    }

    positionX += velocityX;
    positionY += velocityY;

    if (positionX + radius >= width || positionX - radius <= 0) {
        velocityX *= -1;
    }

    if (positionY + radius >= height || positionY - radius <= 0) {
        velocityY *= -1
    }

    stroke(0);
    strokeWeight(3);
    fill(255);
    ellipse(
        positionX, positionY,
        radius * 2, radius * 2
    );

    velocityY += gravity;
}

/**
 * CONDITIONALS
 * 
 * Expressions and Operators
 * Operator - is a special symbol that you use to check, change, 
 * Comparison operators
 *  >
 *  <
 *  >=
 *  <=
 *  ==
 *  !=
 */