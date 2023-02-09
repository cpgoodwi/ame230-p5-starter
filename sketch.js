// sketch.js

function setup() {
	createCanvas(600, 600);

}

function draw() {
	background(128);

    niceBackground();

    fancyCircle(200, 200, 100);
    fancyCircle(400, 400, 75);

    noLoop();
}

function fancyCircle(x, y, radius) {
    // let x = 300;
    // let y = 300;
    // let radius = 100;

    stroke(0);
    fill(255, 0, 0);
    ellipse(
        x, y,
        radius*2, radius*2
    );

    fill(255);
    ellipse(
        x, y,
        radius*1.25, radius*1.25
    )

    fill(255, 0, 0);
    ellipse(
        x, y,
        radius*.5, radius*.5
    );
}

function niceBackground() {
    noStroke();
    fill(40,80,230);
    rect(50, 50, 500, 500);
}

/**
 * NOTES: FUNCTIONS
 * 
 * Why write functions?
 * Encapsulation. Functions let you combine a group of instructuions into onething, which you can now think of and use as one unit.
 * Modularity. Functions are one way to break down larger problems into smaller parts, making code more manageable, readable, and easier to understand. Functions make it wasier to think of our programs in smaller sets of instructions.
 * Reusability. Functions allow us to resue code without having to retype it.
 * Safety. Local variables of a function exist only while the function is executing. These local variables have limited side effects. When global variables are used, you need to be aware of how different functions might make use of those variables
 * Testability. It's easier to test small bits of code with lmited focus. Creating functions that are small and of limited purpose makes it easier to test code, and verify that it works correctly.
 */