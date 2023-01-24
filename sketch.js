// sketch.js

// global variables
const body = document.body;
const mouseXp = document.createElement("p");
const mouseYp = document.createElement("p");

function setup() {
	createCanvas(600, 600);
    body.appendChild(mouseXp);
    body.appendChild(mouseYp);
}

function draw() {
	background(128);

    mouseXp.innerHTML = `${mouseX}`;
    mouseYp.innerHTML = `${mouseY}`;

    // these are local variables
    let eyeX = 300;
    let eyeY = 300;
    let eyeD = 200;
    stroke(0);
    strokeWeight(5);
    fill(250);
    ellipse(
        eyeX, eyeY,
        eyeD, eyeD
    );

    // let pupilX = 300; // replaced later
    let pupilY = 300;
    let pupilD = 50;

    let eyeLeftEdge = eyeX - (eyeD / 2) + (pupilD / 2);
    let eyeRightEdge = eyeX + (eyeD / 2) - (pupilD / 2);

    let amountOfTravel = mouseX / width;
    let edgeDistance = eyeRightEdge - eyeLeftEdge;
    let pupilX = eyeLeftEdge + (edgeDistance * amountOfTravel);
    

    noStroke();
    fill(40);
    ellipse(
        pupilX, pupilY,
        pupilD, pupilD
    );
}
