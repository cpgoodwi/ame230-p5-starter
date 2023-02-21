"use strict";

// sketch.js

let star1;
let star2;

function setup() {
	createCanvas(600, 600);

    star1 = new Star(200, 100, 100, 0.4, 5);
    star2 = new Star(300, 400, 200, 0.4, 8); // bad practice to auto-global scope
}

function draw() {
	background(128);

    // colorMode(HSL);

    star1.spin();
    star1.render();

    star2.spin(0.03);
    star2.render(); // bad practice to auto-global scope
}

class Star {
    constructor(x = 300, y = 300, radius = 200, depth = 0.4, points = 5) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.depth = depth;
        this.points = points;

        this.startAngle = -PI / 2;
        this.strokeColor = color(random(255), random(255), random(255));
        this.fillColor = color(random(255), random(255), random(255));
    }

    spin(rate = 0.02) {
        this.startAngle += rate;
    }

    render() {
        // ellipse(this.x, this.y, this.radius*2, this.radius*2);
        let delta = TWO_PI / this.points;
        let a = this.startAngle;

        stroke(this.strokeColor);
        fill(this.fillColor);

        beginShape();
        for (let count = 0; count < this.points; count++) {
            let x1 = cos(a) * this.radius + this.x;
            let y1 = sin(a) * this.radius + this.y;
            vertex(x1, y1);

            let x2 = cos(a + delta/2) * this.radius * this.depth + this.x;
            let y2 = sin(a + delta/2) * this.radius * this.depth + this.y;
            vertex(x2, y2);

            a += delta;
        }
        endShape(CLOSE);
    }
}