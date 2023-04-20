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
let dataRange;
let minTimeValue;
let maxTimeValue;

function preload() {
	table = loadTable("columbus-oh.csv", "csv", "header");
}

function setup() {
	createCanvas(600, 600);
	// noLoop();

	print(table);

	dataColumn = table.rows.map(row => row.arr[1]);
	minDataValue = floor(min(dataColumn) / 10) * 10;
	maxDataValue = ceil(max(dataColumn) / 10) * 10;
	dataRange = maxDataValue - minDataValue;

	timeColumn = table.rows.map(row => row.arr[0]).map(year => year.slice(0, 4));
	minTimeValue = min(timeColumn);
	maxTimeValue = max(timeColumn);
}

function draw() {
	background(128);

	circleGraph();
}

function circleGraph() {
    // fancy circle graph...

    let maxRadius = 200
    translate(width / 2, height / 2);

	// draw title
	fill("black");
	textFont("Arial");
	textSize(24);
	textAlign(CENTER, BASELINE);
	text("Columbus, OH Average Temperatures 1950—2019", 0, -270);

	// translate mouseX and mouseY values
	let tMouseX = mouseX - width / 2;
	let tMouseY = mouseY - height / 2;

	// draw graph background
    noStroke();
    fill(245);
    ellipse(0, 0, maxRadius * 2, maxRadius * 2);

	// label data values
	for (let i = minDataValue; i <= maxDataValue; i += dataRange / 8) {
		const radius = map(i, minDataValue, maxDataValue, 0, maxRadius);
		stroke("#aaa");
		noFill();
		ellipse(0, 0, radius * 2, radius * 2);
		
		stroke("white");
		fill("black");

		textFont("monospace");
		textSize(12);
		textAlign(LEFT, TOP);
		text(`${i}\u{00B0} F`, 0, -radius);

	}

	// label years
	push();
	rotate(-HALF_PI);
	for (let i = 0; i < timeColumn.length; i += 5) {
		const angle = map(i, 0, timeColumn.length, 0, TWO_PI);
		push(); // push inital angle
		rotate(angle);

		translate(maxRadius, 0);
		
		push();
		rotate(HALF_PI); // push counter angle

		// draw radial lines at edge going in
		stroke("#aaa");
		line(0, 0, 0, maxRadius);

		// write year labels labels
		fill("black");
		stroke("black");
		textFont("monospace");
		textSize(20);
		textAlign(CENTER, CENTER);
		text(timeColumn[i], 0, -10);

		pop(); // pop inital angle
		pop(); // pop counter angle
	}
	pop();

    stroke("black");
    noFill();

	// draw points
	let mouseNearestPoint = undefined;
    beginShape();
    for (const i in dataColumn) {
        const radius = map(dataColumn[i], minDataValue, maxDataValue, 0, maxRadius);
        const angle = map(timeColumn[i], minTimeValue, maxTimeValue + 1, 0, TWO_PI);
        const point = {
            x: radius * sin(TWO_PI * angle / TWO_PI),
            y: -radius * cos(TWO_PI * angle / TWO_PI)
        };

		fill("black");
		if (dist(point.x, point.y, tMouseX, tMouseY) < 5) {
			fill("chartreuse");
			ellipse(point.x, point.y, 7, 7);

			// save box info
			const boxInfo = {
				lineHeight: 12,
				line1: `Year: ${timeColumn[i]}`,
				line2: `Avg temp: ${dataColumn[i]}`,
				x: point.x,
				y: point.y
			}

			mouseNearestPoint = boxInfo
			// rect(tMouseX, tMouseY, max(textWidth(info.line1), textWidth(info.line2)), 12 * 2);

		}
        ellipse(point.x, point.y, 5, 5);
		noFill();

        vertex(point.x, point.y);
    }
    endShape(CLOSE);

	// draw info box
	if (mouseNearestPoint !== undefined) {
		fill("chartreuse");
		const boxWidth = max(textWidth(mouseNearestPoint.line1), textWidth(mouseNearestPoint.line2))
		
		rect(
			mouseNearestPoint.x,
			mouseNearestPoint.y,
			boxWidth, // width
			mouseNearestPoint.lineHeight * 2.2 // height
		)

		fill("black");
		textSize(mouseNearestPoint.lineHeight);
		textFont("monospace");
		textAlign(RIGHT, BOTTOM);
		text(mouseNearestPoint.line1, mouseNearestPoint.x + boxWidth, mouseNearestPoint.y + mouseNearestPoint.lineHeight * 1.1);
		text(mouseNearestPoint.line2, mouseNearestPoint.x + boxWidth, mouseNearestPoint.y + mouseNearestPoint.lineHeight * 2.2);
	}

	// ellipse(mouseX, mouseY, 10, 10);
	fakeCursor(tMouseX, tMouseY);
	// text(`${mouseX}, ${mouseY}\n${tMouseX}, ${tMouseY}`, tMouseX, tMouseY);
}

// fake cursor function because the tracking with translates in p5 aren't completely accurate
// so I hid the cursor with css and draw my own
function fakeCursor(x, y) {
	push();
	translate(x, y);
	fill("black");
	stroke("white");
	triangle(0, 0, 12, 12, 0, 18);
	pop();
}