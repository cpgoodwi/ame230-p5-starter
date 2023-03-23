// sketch.js

let couchBackground; // background
let homer, marge, lisa, maggie, bart; // characters

function preload() {
	couchBackground = loadImage("/simpsons/couch.jpg");
	homer = loadImage("/simpsons/homer.png");
	marge = loadImage("/simpsons/marge.png");
	lisa = loadImage("/simpsons/lisa.png");
	maggie = loadImage("/simpsons/maggie.png");
	bart = loadImage("/simpsons/bart.png");
}

function setup() {
	createCanvas(800, 800);

}

function draw() {
	background(128);

	image(couchBackground, 0, 0);
	image(homer, 182, 394, 120, 160);
	image(marge, 274, 394, 180, 160);
	image(lisa, 353, 435, 120, 120);
	image(maggie, 452, 456, 100, 100);
	image(bart, 534, 418, 100, 140);

}

// used to find the magic numbers to place the images
function mouseClicked() {
	print(mouseX, mouseY);
}