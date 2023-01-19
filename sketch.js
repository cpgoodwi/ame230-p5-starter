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



}

class Cloud {
    constructor(density, width, height, puffVariance) {
        this.density = density; // the distance between puffs
        this.width = width; // the width at the base of the cloud
        this.height = height; // the height to the top of the cloud
        this.puffVariance = 
    }
}

class Puff {
    constructor(maxDiameter, x, y) {
        this.maxDiameter = maxDiameter;
        this.x = x; // 
        this.y = y;
    }
}
