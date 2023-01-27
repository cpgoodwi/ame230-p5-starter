// sketch.js

let barts = [];
let bartScale = 1.0;

function setup() {
	createCanvas(600, 600);

}

function draw() {
	background(128);

	const mouseBart = {x: mouseX, y: mouseY, scale: bartScale};

    for (const bart of barts) {
        drawBart(bart.x, bart.y, bart.scale);
    }

	drawBart(mouseBart.x, mouseBart.y, mouseBart.scale);
}

function mouseClicked() {
    barts.push({x: mouseX, y: mouseY, scale: bartScale});
}

function mouseWheel(event) {
    // TODO: handle scale too small errors
    bartScale += event.delta < 0 && bartScale * 10 > 2 ? 0.1 : -0.1;
}

function drawBart(x, y, scale = 1.0) {
    noStroke(); // this makes it easier to draw using different shapes

    // draw bart's head
    let head = {
        x: x,
        y: y - 20 * scale,
        width: 200 * scale,
        height: 350 * scale
    }
    fill("#FED41D");
    rectMode(CENTER);
    rect(
        head.x, head.y,
        head.width, head.height,
        0, 0, 20 * scale, 20 * scale // radius on bottom corners to curve the head to the neck
    );

    let neck = {
        x: x,
        y: y + 165 * scale,
        width: 160 * scale,
        height: 20 * scale
    }
    rect(
        neck.x, neck.y,
        neck.width, neck.height
    );

    // draw bart's crown (hair)
    let spikeValleys = 9;
    let headTop = {
        leftX: x - head.width / 2,
        y: head.y - head.height / 2,
        rightX: x + head.width / 2
    };
    let spikeWidth = (headTop.rightX - headTop.leftX) / spikeValleys;
    let spikeHeight = 20 * scale;
    beginShape();
    vertex(headTop.leftX, headTop.y);
    for (let i = 0; i < spikeValleys; i++) {
        vertex(headTop.leftX + i * spikeWidth, headTop.y - spikeHeight);
        vertex(headTop.leftX + (i + 0.5) * spikeWidth, headTop.y);
    }
    vertex(headTop.rightX, headTop.y - spikeHeight);
    vertex(headTop.rightX, headTop.y);
    endShape();

    // draw bart's ears
    let leftEar = {
        x: x - head.width / 2,
        y: y + 25 * scale,
        width: 30 * scale,
        height: 40 * scale
    };
    let rightEar = {
        x: x + head.width / 2,
        y: y + 25 * scale,
        width: 30 * scale,
        height: 40 * scale
    };
    ellipse(
        leftEar.x, leftEar.y,
        leftEar.width, leftEar.height
    );
    ellipse(
        rightEar.x, rightEar.y,
        rightEar.width, rightEar.height
    );

    // draw bart's nose
    stroke(0);
    strokeWeight(2 * scale);
    fill("#FED41D");
    let noseWidth = 55 * scale;
    let noseHeight = 55 * scale;
    arc(
        x, y + noseHeight / 2,
        noseWidth, noseHeight,
        -PI / 3, -2*PI/3
    );

    // draw bart's mouth
    const mouthPoints = [
        {x: x - 80 * scale, y: y + 100 * scale},
        {x: x, y: y + 110 * scale},
        {x: x + 80 * scale, y: y + 100 * scale}
    ];
    noFill();
    beginShape();
    vertex(mouthPoints[0].x, mouthPoints[0].y);
    for (let i = 0; i < mouthPoints.length; i++) {
        curveVertex(mouthPoints[i].x, mouthPoints[i].y);
    }
    vertex(mouthPoints[mouthPoints.length - 1].x, mouthPoints[mouthPoints.length - 1].y);
    endShape();

    noStroke();
    // draw bart's eyes
    let leftEyeCenter = {
        x: x - 60 * scale,
        y: y - 30 * scale
    };
    let rightEyeCenter = {
        x: x + 60 * scale,
        y: y - 30 * scale
    };
    let eyeRadius = 50 * scale;
    fill("white");
    circle(
        leftEyeCenter.x,
        leftEyeCenter.y,
        eyeRadius * 2
    );
    circle(
        rightEyeCenter.x,
        rightEyeCenter.y,
        eyeRadius * 2
    );

    // TODO: animate bart's eyes
    let leftPupil = {
        x: leftEyeCenter.x,
        y: leftEyeCenter.y
    };
    let rightPupil = {
        x: rightEyeCenter.x,
        y: rightEyeCenter.y
    };
    let pupilRadius = 10 * scale;
    fill(0);
    circle(
        leftPupil.x,
        leftPupil.y,
        pupilRadius * 2
    );
    circle(
        rightPupil.x,
        rightPupil.y,
        pupilRadius * 2
    );
}
