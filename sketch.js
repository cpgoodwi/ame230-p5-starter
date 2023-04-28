// sketch.js

let sound;

function preload() {
	sound = loadSound("metal-bar-falling-sound-effect.mp3");
}

function setup() {
	createCanvas(600, 600);
	print(sound.isLoaded() ? "sound ready" : "sound not ready");
	print(sound.duration())

	textFont("monospace");
	textSize(40);
}

function draw() {
	background(128);

	if (sound.isPlaying()) {
		text(sound.currentTime(), 100, 100);
		soundProgressBar(300, 300, sound.currentTime(), sound.duration())
	}
}

function keyPressed() {
	if (key === " ") {
		sound.play();
	}
}

function soundProgressBar(x, y, time, duration) {
	const bar = {
		start: x - 150,
		end: x + 150,
		height: 10,
		width: 300,
	}

	// draw bar background
	fill("white");
	stroke("black");
	strokeWeight(1);
	rect(bar.start, y, bar.width, bar.height);

	// draw progress meter
	bar.progress = map(time, 0, duration, bar.start + 5, bar.end - 5);

	strokeWeight(5);
	stroke("black");
	line(bar.start + 5, y + bar.height / 2, bar.progress, y + bar.height / 2)
}