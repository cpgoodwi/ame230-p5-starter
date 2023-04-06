// sketch.js

let me;
let targetFrameRate; // getTargetFrameRate() was not working for me when I tried to use it.
let gridSize;
let colorShapes;

function preload() {
    me = loadImage("me_reduced.jpg");
}

function setup() {
	createCanvas(600, 800);
    targetFrameRate = 60;
    frameRate(targetFrameRate);
    rectMode(CENTER);
    noStroke(); // no outlines

    gridSize = 8;

    // lookup table for determining shape based on the hue
    const shapeLookup = [
        (x, y, c) => {return new ColorCircle(x, y, c)},
        (x, y, c) => {return new ColorSquare(x, y, c)},
        (x, y, c) => {return new ColorTriangle(x, y, c)},
        // (x, y, c) => {return new ColorStar(x, y, c)},
        (x, y, c) => {return new ColorSquare(x, y, c)},
    ];

    colorShapes = {
        data: [],
        count: 0,
        width: 0,
        height: 0
    }

    for (let row = 0; row < height / gridSize; row++) {
        colorShapes.data.push([]);
        for (let column = 0; column < width / gridSize; column++) {
            let colorValue = me.get(column * gridSize, row * gridSize);
            // print(colorValue);
            let lookupIndex = floor(hue(colorValue) / 360 * shapeLookup.length);
            colorShapes.data[row].push(shapeLookup[lookupIndex](column * gridSize, row * gridSize, colorValue));
            colorShapes.count++;
        }
        colorShapes.width = max(colorShapes.width, colorShapes.data[row].length); // in case column lengths vary, this finds the max
    }
    colorShapes.height = colorShapes.data.length;

    colorShapes.data = shuffle(colorShapes.data.flat(1));
    print(colorShapes);
}

function draw() {
	background(0);
    translate(gridSize / 2, gridSize / 2); // make first shape centered on first spot

    // TODO: change the order of which we render the array
    for (const colorShape of colorShapes.data) {
        colorShape.morph();
        colorShape.render();
    }
}

class ColorShape {
    constructor(x, y, c, scale = random(2, 2.5)) {
        this.x = x; // x coordinate of the shape
        this.y = y; // y coordinate of the shape
        this.controlW = gridSize * scale; // width of the shape that will not change
        this.w = this.controlW; // width of the shape for rendering
        this.controlH = gridSize * scale; // height of the shape that will not change
        this.h = this.controlH; // height of the shape for rendering
        this.c = c; // color value expects p5 color object
        this.c[3] *= 0.8; // changes color alpha to 80%; not sure why this.c.setAlpha() was not working...
        this.rotation = 0;
    }

    // run draw function at location
    render(renderFunction) {
        push();

        translate(this.x, this.y); // move origin to new spot
        rotate(this.rotation);
        fill(this.c);
        renderFunction(); // run draw function passed as an object

        pop();
    }

    // abstract morph() method
    morph() {
        throw new Error("morph() method not implemented for this object");
    }
}

class ColorCircle extends ColorShape {
    constructor(x, y, colorValue) {
        super(x, y, colorValue);
        this.morphValue = random(1, 2);
    }

    render() {
        super.render(() => {
            ellipse(
                0, 0,
                this.w, this.h
            )
        });
    }

    morph() {
        let morphAmount = this.morphValue * sin(frameCount / (targetFrameRate * .5)) + 2;
        this.w = this.controlW * morphAmount;
        this.h = this.controlH * morphAmount;
    }
}

class ColorSquare extends ColorShape {
    constructor(x, y, colorValue) {
        super(x, y, colorValue);
        this.morphValue = random(-2, 2);
    }

    render() {
        super.render(() => {
            rect(
                0, 0,
                this.w, this.h
            )
        });
    }

    morph() {
        let morphAmount = this.morphValue * sin(frameCount / (targetFrameRate * .5)) + 2;
        this.w = this.controlW * morphAmount;
        this.h = this.controlH * morphAmount;

        this.rotation = -1 * morphAmount;
    }
}

class ColorTriangle extends ColorShape {
    constructor(x, y, colorValue) {
        super(x, y, colorValue);
        this.morphValue = random(3);
    }

    render() {
        super.render(() => {
            triangle(
                0, -0.5 * this.h,
                -0.5 * this.w, 0.5 * this.h,
                0.5 * this.w, 0.5 * this.h
            )
        });
    }

    morph() {
        let morphAmount = this.morphValue * sin(frameCount / (targetFrameRate * .5)) + 2;
        this.w = this.controlW * morphAmount;
        this.h = this.controlH * morphAmount;

        this.rotation = morphAmount;
    }
}

// unused because custom shapes was hard to figure out
class ColorStar extends ColorShape {
    constructor(x, y, colorValue) {
        super(x, y, colorValue);
        this.innerWidth = this.w * 0.5;
        this.innerHeight = this.h * 0.5;
        this.morphValue = random(-1, 1);
    }

    render() {
        super.render(() => {
            beginShape();
            vertex(-0.5 * this.w, -0.5 * this.h);
            vertex(0, 0.5 * this.innerHeight);
            vertex(0.5 * this.w, -0.5 * this.h);
            vertex(0.5 * this.innerWidth, 0);
            vertex(0.5 * this.w, 0.5 * this.h);
            vertex(0, 0.5 * this.innerHeight);
            vertex(-0.5 * this.w, 0.5 * this.h);
            vertex(-0.5 * this.innerWidth, 0);
            endShape(CLOSE);
        });
    }

    morph() {
        let morphAmount = this.morphValue * sin(frameCount / (targetFrameRate * .5)) + 3;
        this.innerWidth = this.innerWidth * morphAmount;
        this.innerHeight = this.innerHeight * morphAmount;

        this.rotation += this.morphValue;
    }
}