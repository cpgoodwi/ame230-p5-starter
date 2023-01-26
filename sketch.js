// sketch.js

let cloud = new Cloud(200, 200, 10, 10);

function setup() {
	createCanvas(600, 600);
}

function draw() {
	background(128);

    // strokeWeight(1);
    // stroke(100);
    // for (let grid = 0; grid < 600; grid += 50) {
    //     line(0, grid, 600, grid);
    //     line(grid, 0, grid, 600);
    // }

    cloud.drawSelf();

}