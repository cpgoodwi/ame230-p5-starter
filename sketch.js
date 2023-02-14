// sketch.js

function setup() {
	createCanvas(600, 600);

}

function draw() {
	background(128);

    let cx = 300;
    let cy = 300;
    let radius = 100;
    let distanceToCircle = distance(cx, cy, mouseX, mouseY);

    textSize(25);
    text(distanceToCircle, 50, 50)

    if (distanceToCircle < radius)
        fill("green");
    else
        fill("red");
    
    stroke(0);
    ellipse(cx, cy, radius*2, radius*2);
}

function distance(x1, y1, x2, y2) {
    let a = y2 - y1;
    let b = x2 - x1;
    let c = sqrt(a * a + b * b);
    return c;
}