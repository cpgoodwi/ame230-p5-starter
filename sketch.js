// sketch.js

let colorShapes = [];
let gridSize;
let me;

function preload() {
    me = loadImage("me_reduced.jpg");
}

function setup() {
	createCanvas(600, 800);
    frameRate(15);
    rectMode(CENTER);

    gridSize = 10;

    const shapeLookup = [
        (x, y, c) => {return new ColorCircle(x, y, c)},
        (x, y, c) => {return new ColorSquare(x, y, c)},
    ];

    for (let i = 0; i < width / gridSize; i++) {
        colorShapes.push([]);
        for (let j = 0; j < height / gridSize; j++) {
            let colorValue = me.get(i * gridSize, j * gridSize);
            // TODO: lookup where hue value fits in color range
            // colorShapes[i].push(shapeLookup[])
            
            colorShapes[i].push(new ColorCircle(i * gridSize, j * gridSize, colorValue));
        }
    }
}

function draw() {
	background(0);
    translate(gridSize / 2, gridSize / 2); // make first shape centered on first spot
    noStroke(); // no outlines

    // TODO: change the order of which we render the array
    for (const row of colorShapes) {
        for (const colorShape of row) {
            colorShape.render();
        }
    }
}

class ColorShape {
    constructor(x, y, c) {
        this.x = x; // x coordinate of the shape
        this.y = y; // y coordinate of the shape
        this.w = gridSize; // width of the shape
        this.h = gridSize; // height of the shape
        this.c = c; // color value expects p5 color object
    }

    // run draw function at location
    render(renderFunction) {
        push();

        translate(this.x, this.y); // move origin to new spot
        fill(this.c);
        renderFunction(); // run draw function passed as an object

        pop();
    }
}

class ColorCircle extends ColorShape {
    constructor(x, y, colorValue) {
        super(x, y, colorValue);
    }

    render() {
        super.render(() => {ellipse(0, 0, this.w, this.h)});
    }
}

class ColorSquare extends ColorShape {
    constructor(x, y, colorValue) {
        super(x, y, colorValue);
    }

    render() {
        super.render(() => {rect(0, 0, this.w, this.h)});
    }
}