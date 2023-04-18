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
