// sketch.js

let stop = false;

function setup() {
	createCanvas(600, 600);
    frameRate(4);

}

function draw() {
	background(128);

    let centerX = 300;
    let centerY = 300;
    let radius = 10;

    noFill();
    // ellipse(
    //     centerX, centerY,
    //     radius * 2, radius * 2
    // );

    beginShape();
    let a = 0.0;
    while (a < TWO_PI * 10) {
        let x = cos(a) * radius + centerX;
        let y = sin(a) * radius + centerY;
        // rectMode(CENTER);
        // fill("red");
        // rect(
        //     x, y,
        //     8, 8
        // );
        vertex(x, y);
        a += PI * 0.05;
        radius += .5;
    }
    endShape();

    if (stop)
        noLoop();
    // end of draw function
}

function mouseClicked() {
    stop = !stop;
}