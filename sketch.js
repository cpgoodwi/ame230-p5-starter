// sketch.js

let metalBarSound;
let metalBarImage;

// p5.Elements
let controlsContainer;
let rateLabel;
let rateSlider;
let playPauseButton;
let volumeSlider;
let volumeLabel;

function preload() {
	metalBarSound = loadSound("metal-bar-falling-sound-effect.mp3");
	metalBarImage = loadImage("metal-bar.jpg");
}

function setup() {
	createCanvas(600, 400);
	print(metalBarSound.isLoaded() ? "sound ready" : "sound not ready");

	// using elements to control the sound, styling is in CSS
	controlsContainer = createDiv();
	controlsContainer.id('soundControls');

	rateLabel = createSpan("Rate");
	rateLabel.parent("#soundControls");
	rateLabel.style("text-align", "right");
	rateSlider = createSlider(0, 200, 100);
	rateSlider.parent("#soundControls");

	playPauseButton = createButton("\u{23F5}");
	playPauseButton.parent("#soundControls");
	playPauseButton.mousePressed(soundPlayPause);

	volumeSlider = createSlider(0, 100);
	volumeSlider.parent("#soundControls");
	volumeLabel = createSpan("Volume");
	volumeLabel.parent("#soundControls");
	volumeLabel.style("text-align", "left");

	textAlign(CENTER);
	textFont("monospace");
	textSize(30);
}

function draw() {
	background(128);

	const rate = rateSlider.value();
	const volume = volumeSlider.value();

	image(metalBarImage, 100, 50, 400, 200);

	if (metalBarSound.isPlaying()) {
		playPauseButton.html("\u{23F8}");
	} else {
		playPauseButton.html("\u{23F5}");
	}

	soundProgressBar(300, 300, metalBarSound.currentTime(), metalBarSound.duration())

	text(`${rate}%`, 200, 400);
	metalBarSound.rate(map(rate, 0, 200, 0, 2.0));

	text(`${volume}%`, 400, 400);
	metalBarSound.setVolume(map(volume, 0, 100, 0, 1.0));
}

function soundProgressBar(x, y, time, duration) {
	const bar = {
		start: x - 200,
		end: x + 200,
		height: 10,
		width: 400,
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
	line(bar.start + 5, y + bar.height / 2, bar.progress, y + bar.height / 2);
}

function soundPlayPause() {
	print("play/pause");

	if (metalBarSound.isPlaying()) {
		metalBarSound.pause();
	} else {
		metalBarSound.play();
	}
}