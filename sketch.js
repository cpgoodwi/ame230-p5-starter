"use strict";
// sketch.js

const lineGraph = {
	x: 100,
	y: 100,
	width: 600,
	height: 400
}

let table;

let dataColumn;
let timeColumn;

let minDataValue;
let maxDataValue;
let minTimeValue;
let maxTimeValue;

function preload() {
	table = loadTable("phoenix-az.csv", "csv", "header");
}

function setup() {
	createCanvas(800, 600);
	noLoop();

	print(table);

	dataColumn = table.rows.map(row => row.arr[1]);
	minDataValue = min(dataColumn);
	print(minDataValue);
	maxDataValue = max(dataColumn);

	timeColumn = table.rows.map(row => row.arr[0]).map(year => year.slice(0, 4));
	minTimeValue = min(timeColumn);
	print(minTimeValue);
	maxTimeValue = max(timeColumn);
}

function draw() {
	background(128);

	drawLineGraph();
}

function drawLineGraph() {
	noStroke();
	fill(245);
	rect(lineGraph.x, lineGraph.y, lineGraph.width, lineGraph.height);

	beginShape();
	for (const i in dataColumn) {
		let y = map(dataColumn[i], minDataValue, maxDataValue, lineGraph.y + lineGraph.height, lineGraph.y);
		let x = map(timeColumn[i], minTimeValue, maxTimeValue, lineGraph.x, lineGraph.x + lineGraph.width);
		stroke("black");
		fill("black");
		ellipse(x, y, 10, 10);
		noFill();
		vertex(x, y);
	}
	endShape();

	textFont("Verdana");
	textSize(16);

	// draw Y axis labels
	textAlign(RIGHT, CENTER);
	for (let dataValue = minDataValue; dataValue <= maxDataValue; dataValue++) {

	}

	// draw X axis labels
	textAlign(CENTER, TOP);
	for (let timeValue = minTimeValue; timeValue <= maxTimeValue; timeValue += 10) {
		let x = map(timeValue, minTimeValue, maxTimeValue, lineGraph.x, lineGraph.x + lineGraph.width);
	}
}

function drawCircleGraph() {
    // fancy circle graph...
    let maxRadius = 200
    translate(width / 2, height / 2);
    // rotate(-HALF_PI);

    noStroke();
    fill(245);
    ellipse(0, 0, maxRadius * 2, maxRadius * 2);

    stroke("black");
    noFill();

    beginShape();
    for (const i in dataColumn) {
        const radius = map(dataColumn[i], minDataValue, maxDataValue, 0, maxRadius);
        const angle = map(timeColumn[i], minTimeValue, maxTimeValue + 1, 0, TWO_PI);
        const point = {
            x: radius * sin(TWO_PI * angle / TWO_PI),
            y: radius * cos(TWO_PI * angle / TWO_PI)
        };
        ellipse(point.x, -point.y, 5, 5);
        // text(i, point.x, -point.y);
        vertex(point.x, -point.y);
    }
    endShape(CLOSE);
}