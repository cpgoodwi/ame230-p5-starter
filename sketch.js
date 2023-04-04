// sketch.js

let colorCircles = [];

function setup() {
	createCanvas(600, 600);

    for (let i = 0; i < width / 10; i ++) {
        colorCircles.push([]);
        for (let j = 10; j < height / 10; j++) {
            colorCircles[i].push(new ColorCircle(i * 10, j * 10));
        }
    }
}

function draw() {
	background(128);
    noStroke();

    for (const row of colorCircles) {
        for (const colorCircle of row) {
            fill(colorCircle.colorValue);
            ellipse(colorCircle.x, colorCircle.y, colorCircle.width, colorCircle.height);
        }
    }
}

class ColorCircle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.colorValue = color(random(255), random(255), random(255))
    }
}