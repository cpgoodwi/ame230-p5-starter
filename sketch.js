// sketch.js

let samples = [];
let times = [];

let graphX = 100;
let graphY = 100;
let graphWidth = 600;
let graphHeight = 400;

let minDataValue = 60;
let maxDataValue = 100;
let minTimeValue;
let maxTimeValue;

function setup() {
	createCanvas(800, 600);

    for (let i = 1; i <= 12; i++) {
        samples.push(random(minDataValue, maxDataValue));
        times.push(i);
    }

    minTimeValue = min(times);
    maxTimeValue = max(times);
}

function draw() {
	background(128);

    noStroke();
    fill(245);
    rect(graphX, graphY, graphWidth, graphHeight);

    drawLineGraph();
}

function drawLineGraph() {
    beginShape();
    for (const i in samples) {
        let y = map(samples[i], minDataValue, maxDataValue, graphY + graphHeight, graphY);
        let x = map(times[i], minTimeValue, maxTimeValue, graphX, graphX + graphWidth);
        stroke("black");
        noFill();
        ellipse(x, y, 10, 10);
        vertex(x, y);
    }
    endShape();
}