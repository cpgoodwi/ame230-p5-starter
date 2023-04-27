// sketch.js

let sound;

function preload() {
	sound = loadSound("metal-bar-falling-sound-effect.mp3");
}

function setup() {
	createCanvas(600, 600);
	print(sound.isLoaded() ? "sound ready" : "sound not ready");

	textFont("monospace");
	textSize(40);
}

function draw() {
	background(128);

	text(frameCount, 300, 300);
}

function keyPressed() {
	if (key === " ") {
		sound.play();
	}
}

function canvasButton(x, y, text, action) {
	
}