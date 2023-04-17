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
        samples.push(random(minDataValue + 5, maxDataValue - 5));
        times.push(i);
    }

    minTimeValue = min(times);
    maxTimeValue = max(times);
}

function draw() {
	background(128);

    // drawLineGraph();
    drawCircleGraph();
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
    // // beginShape();
    // for (const i in samples) {
    //     push();
    //     let dist = map(samples[i], minDataValue, maxDataValue, 0, maxRadius);
    //     let rotation = map(times[i], minTimeValue, maxTimeValue + 1, 0, TWO_PI);
    //     rotate(rotation);
    //     text(i, 0, -dist);
    //     ellipse(0, -dist, 10, 10);
    //     // vertex(0, height);
    //     pop();
    // }
    // // endShape();

    beginShape();
    for (const i in samples) {
        const radius = map(samples[i], minDataValue, maxDataValue, 0, maxRadius);
        const angle = map(times[i], minTimeValue, maxTimeValue + 1, 0, TWO_PI);
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

function drawLineGraph() {
    // typical line graph...
    noStroke();
    fill(245);
    rect(graphX, graphY, graphWidth, graphHeight);

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