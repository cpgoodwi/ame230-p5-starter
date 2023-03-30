// sketch.js

// declare photo variables
let img;

// for loading images BEFORE the setup
function preload() {
    img = loadImage(); // give it the relative location of the image
}

function setup() {
	createCanvas(800, 800);

}

function draw() {
	background(128);

    image(img, 0, 0); // tell it to draw the image with top left corner coordinate
}

// You can manipulate image size in p5, but it might be better to save processing time by changing the size BEFORE loading it in.