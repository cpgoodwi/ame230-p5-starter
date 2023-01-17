// sketch.js

function setup() {
	createCanvas(600, 600);

}

function draw() {
	background(128);

    strokeWeight(1);
    stroke(100);
    for (let grid = 0; grid < 600; grid += 50) {
        line(0, grid, 600, grid);
        line(grid, 0, grid, 600);
    }

    strokeWeight(10);
    stroke(0);
    fill(255);
    rectMode(CENTER);
    rect(300, 200, 100, 100);
    
    fill(255, 0, 0, 128); // fourth value is alpha
    // noStroke();
    ellipse(300, 300, 200, 200);
    
    stroke(0, 128, 0);
    line(100, 500, 500, 500);

    stroke(0);
    fill(200, 200, 200);
    triangle(
        100, 150,
        50, 100,
        0, 150
    );

    strokeWeight(2);
    arc(
        150, 300,
        100, 100,
        0, PI + 1,
        OPEN
    );

    beginShape();
    vertex(100, 400);
    vertex(300, 480);
    vertex(500, 400);
    endShape();
}
