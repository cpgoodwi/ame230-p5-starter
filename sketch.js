// sketch.js

function setup() {
	createCanvas(600, 600);

}

function draw() {
	background(128);

	// draw homer head shape
	const homerHeadVertices = [
		{x: 200, y: 550},
		{x: 200, y: 435},
		{x: 200, y: 170},
		{x: 310, y: 105},
		{x: 420, y: 180},
		{x: 420, y: 435},
		{x: 420, y: 550},
	];
	fill("#FED90F");
	drawCurve(homerHeadVertices);

	// draw homer hair
	const homerHair1Verteces = [
		{x: 240, y: 120},
		{x: 295, y:  90},
		{x: 355, y: 125},
	];
	const homerHair2Verteces = [
		{x: 280, y: 107},
		{x: 340, y:  90},
		{x: 380, y: 135},
	];
	noFill();
	drawCurve(homerHair1Verteces, false);
	drawCurve(homerHair2Verteces, false);

	// draw homer hair zig-zag
	const homerHairZigZagVerteces = [
		{x: 390, y: 300},
		{x: 410, y: 255},
		{x: 420, y: 305},
		{x: 430, y: 260},
		{x: 435, y: 310},
	];
	drawConnectedLine(homerHairZigZagVerteces, false);

	// draw homer ear
	fill("#FED90F");
	arc(
		425, 330,
		50, 65,
		PI + 1, 2
	);

	// draw homer inner ear
	noFill();
	arc(
		425, 330,
		25, 40,
		PI + 1, 1.5
	);

	// draw homer eye 1
	fill(255);
	ellipse(
		210, 300,
		100, 100
	);
	fill(0)
	ellipse(
		215, 300,
		10, 10
	);

	// draw homer eye 2
	fill(255);
	ellipse(
		300, 305,
		100, 100
	);
	fill(0)
	ellipse(
		305, 305,
		10, 10
	);

	// draw homer mouth
	const homerMouthTopVerteces = [
		{x: 340, y: 435}, // mouth edge 1
		{x: 335, y: 400},
		{x: 320, y: 380},
		{x: 280, y: 370},
		{x: 240, y: 370},
		{x: 190, y: 380},
		{x: 170, y: 400},
		{x: 165, y: 420},
		{x: 170, y: 430},
		{x: 190, y: 435}, // mouth edge 2
		{x: 240, y: 440},
		{x: 290, y: 435},
	];
	const homerMouthBotVerteces = [
		{x: 340, y: 435},
		{x: 335, y: 460},
		{x: 320, y: 470},
		{x: 280, y: 480},
		{x: 240, y: 480},
		{x: 190, y: 470},
		{x: 180, y: 455},
		{x: 178, y: 435},
	];
	fill("#D1B271");
	drawCurve(homerMouthBotVerteces, false); // bottom before top
	drawCurve(homerMouthTopVerteces, false);

	// draw homer nose
	const homerNoseVerteces = [
		{x: 250, y: 330},
		{x: 230, y: 340},
		{x: 215, y: 345},
		{x: 205, y: 360},
		{x: 215, y: 375},
		{x: 280, y: 370},
	];
	fill("#FED90F");
	drawCurve(homerNoseVerteces, false);
}

// Given an array of points, this function will draw a curve connecting those points.
function drawCurve(verteces, emPoints = false) {
	// if emPoints flag is true, it will emphasize those points in the canvas
	if (emPoints) {
		strokeWeight(5);
		for (const p of verteces) {
			point(p.x, p.y);
		}
		strokeWeight(1);
	}

	beginShape();
	curveVertex(verteces[0].x, verteces[0].y);
	for (const p of verteces) {
		curveVertex(p.x, p.y);
	}
	curveVertex(verteces[verteces.length - 1].x, verteces[verteces.length - 1].y);
	endShape();
}

// Given a list of points, this function will draw a zig zag connecting them
function drawConnectedLine(verteces, emPoints = false) {
	if (emPoints) {
		strokeWeight(5);
		for (const p of verteces) {
			point(p.x, p.y);
		}
		strokeWeight(1);
	}

	for (let i = 0; i < verteces.length - 1; i++) {
		line(
			verteces[i].x, verteces[i].y,
			verteces[i + 1].x, verteces[i + 1].y,
		);
	}
}