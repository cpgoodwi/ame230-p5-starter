// sketch.js

const pixelSize = 3;
const blockWidth = 16 * pixelSize;

// texture atlas as data structures
const floorBrickTexture = [
    [2, 3, 3, 3, 3, 3, 3, 3, 3, 1, 2, 3, 3, 3, 3, 2],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 1],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 1],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 1],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 1],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 1],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 1],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 1],
    [3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 1],
    [1, 1, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 1],
    [3, 3, 1, 1, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 1],
    [3, 2, 3, 3, 1, 1, 1, 1, 3, 2, 2, 2, 2, 2, 2, 1],
    [3, 2, 2, 2, 3, 3, 3, 1, 3, 2, 2, 2, 2, 2, 2, 1],
    [3, 2, 2, 2, 2, 2, 2, 1, 3, 2, 2, 2, 2, 2, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 2, 3, 1, 1, 1, 1, 1, 1, 2],
];

const blockTexture = [
    [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
    [3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0],
    [3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0],
    [3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
    [3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
    [3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
];

function setup() {
	createCanvas(600, 600);
    frameRate(15);
    colorMode(HSL, 255, 255, 5);
}

function draw() {
	background("cornflowerblue"); // paint background sky blue

    // draw ground
    for (let block = 0; block < width; block += blockWidth) {
        drawTexture(block, height - 2 * blockWidth, floorBrickTexture, 14);
        drawTexture(block, height - blockWidth, floorBrickTexture, 14);
    }

    let pyramidLeftEdge = blockWidth * 2;
    let pyramidBottomEdge = height - blockWidth * 2;
    for (let row = 0; row < 8; row++) {
        for (let col = 8; col > row; col--) {
            drawTexture(
                pyramidLeftEdge + col * blockWidth, // x
                pyramidBottomEdge - row * blockWidth - blockWidth, // y
                blockTexture,
                14
            );
        }
    }

    // drawTexture(300, 300, blockTexture, 14);

    noLoop();
}

// draw individual pixels of the image
function drawPixel(x, y) {
    rect(x, y, pixelSize, pixelSize);
}

// color params are used to filter the color of the brick similar to how the original mario colored its textures
function drawTexture(x, y, texture, colorH = 0) {
    noStroke();
    for (let row = 0; row < floorBrickTexture.length; row++) {
        for (let col = 0; col < floorBrickTexture[row].length; col++) {
            fill(
                colorH,
                255,
                texture[row][col] // TODO: figure out brightness filter or just normalize the data
            );
            drawPixel(x + col * pixelSize, y + row * pixelSize);
        }
    }
}

class Brick {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }
}