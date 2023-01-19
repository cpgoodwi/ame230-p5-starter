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
    constructor(x, y, width, height, density = 10, puffVariance = 5) {
        this.x = x; // x coordinate of the center base of the cloud
        this.y = y; // y coordinate of the center base of the cloud
        this.width = width; // the width at the base of the cloud in terms of puffs
        this.height = height; // the height to the top of the cloud in terms of puffs
        this.density = density; // the distance between puffs
        this.puffVariance = puffVariance // the variation of the puffs around their center point
    }
}

class Puff {
    constructor(x, y, maxDiameter = 5, minColor = 192, maxColor = 255) {
        this.x = x; // x coordinate of the puff
        this.y = y; // y coordinate of the puff
        this.maxDiameter = maxDiameter; // max diameter of the changing puff
        this.minColor = minColor; // minimum gray value of the puff
        this.maxColor = maxColor; // maximum gray value of the puff
    }

    drawSelf() {

    }
}
