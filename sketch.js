// sketch.js

// declaring and using global variables for global scope and 1-time creation

let state = 0; // variable to keep track of the state of the program
let rectangles; // array that stores the center X color logic for each square
let rectangleY; // all squares share the same height
const rectangleWidth = 100; // all squares share the same width


function setup() {
	createCanvas(600, 600);

    // defining variables in global scope
    rectangles = [
        {x: 0.4 * width / 2, y: height / 2, color: "white"},
        {x: 0.8 * width / 2, y: height / 2, color: "white"},
        {x: 1.2 * width / 2, y: height / 2, color: "white"},
        {x: 1.6 * width / 2, y: height / 2, color: "white"},
    ];
    rectangleY = height / 2;
}

function draw() {
	background(128);

    stroke("black");
    strokeWeight(5);
    rectMode(CENTER);

    for (const rectangle of rectangles) {
        fill(rectangle.color);
        rect(
            rectangle.x, rectangleY,
            rectangleWidth, rectangleWidth
        );
    }

    switch (state) {
        // if 0 colors, update on hover over first
        case 0:
            if (mouseInRect(rectangles[state].x)) {
                rectangles[state].color = "red"
                state++;
            }
            break;
        // if 1 color, update on hover over second
        case 1:
            if (mouseInRect(rectangles[state].x)) {
                rectangles[state].color = "green"
                state++;
            }
            break;
        // if 2 colors, update on hover over third
        case 2:
            if (mouseInRect(rectangles[state].x)) {
                rectangles[state].color = "blue"
                state++;
            }
            break;
    }

    // if hover over last, reset
    if (mouseInRect(rectangles[3].x)) {
        for (const rect of rectangles)
            rect.color = "white";
        state = 0;
    }
}

function mouseInRect(centerX) {
    let squareRadius = rectangleWidth / 2;
    return (
        (mouseX >= centerX - squareRadius && mouseX <= centerX + squareRadius) &&
        (mouseY >= rectangleY - squareRadius && mouseY <= rectangleY + squareRadius)
    );
}