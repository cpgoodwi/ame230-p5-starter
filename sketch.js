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

let ground,
    pyramid;

function setup() {
	createCanvas(600, 600);
    frameRate(15);
    colorMode(HSL, 360, 100, 5);

    // build ground as array
    ground = [];
    for (let block = 0; block < width; block += blockWidth) {
        ground.push(new EnvironmentSprite(floorBrickTexture, 14, block, height - 2 * blockWidth));
        ground.push(new EnvironmentSprite(floorBrickTexture, 14, block, height - blockWidth));
    }

    // build pyramid as array
    pyramid = [];
    let pyramidLeftEdge = blockWidth * 2;
    let pyramidBottomEdge = height - blockWidth * 2;
    for (let row = 0; row < 8; row++) {
        for (let col = 8; col > row; col--) {
            pyramid.push(
                new EnvironmentSprite(
                    blockTexture,
                    14,
                    pyramidLeftEdge + col * blockWidth,
                    pyramidBottomEdge - row * blockWidth - blockWidth
                )
            );
        }
    }
}

function draw() {
	background("cornflowerblue"); // paint background sky blue

    // draw ground
    for (const block of ground) {
        block.render();
    }

    // draw pyramid
    for (const block of pyramid) {
        block.render();
    }

    // drawTexture(300, 300, blockTexture, 14);

    noLoop();
}

// draw individual pixels of the image
function drawPixel(x, y) {
    rect(x, y, pixelSize, pixelSize);
}

class Brick {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }
}

class EnvironmentSprite {
    constructor(texture, hue, x, y) {
        this.texture = texture;
        this.hue = hue;
        this.x = x;
        this.y = y;
    }

    render() {
        noStroke();
        for (let row = 0; row < this.texture.length; row++) {
            for (let col = 0; col < this.texture[row].length; col++) {
                fill (this.hue, 100, this.texture[row][col]);
                drawPixel(this.x + col * pixelSize, this.y + row * pixelSize);
            }
        }
    }
}