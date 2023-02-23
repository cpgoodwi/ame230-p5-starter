// sketch.js

const GRAVITY = 1;
const BOUNCE = 0.98;

// initalize two balls
let constantBall;
let randomBall;

let mouseBall;
let balls = [];

function setup() {
	createCanvas(600, 600);

    // define the balls in the setup
    constantBall = new Ball(
        450, 300, // start at coordinates (450, 300) on canvas; right side at half height
        50, // radius of 50 pixels
        10, // initial x velocity is moving 10 pixels per frame to the right
        -10, // initial y velocity is moving 10 pixels per frame upwards
        "chartreuse", // the color is set to chartreuse
        GRAVITY, BOUNCE // uses global constant gravity and bounce values for consistent physics
    );

    randomBall = newRandomBall();

    // creating another random ball to follow the mouse
    mouseBall = newRandomBall();

}

function draw() {
    background(128);

    // process the movement of the balls with their move() methods
    constantBall.move();
    randomBall.move();

    // render (draw) them after their positions are updated
    constantBall.render();
    randomBall.render();

    for (const ball of balls) {
        ball.move();
        ball.render();
    }

    // follow the cursor with a ball
    mouseBall.x = mouseX;
    mouseBall.y = mouseY;
    mouseBall.render();
}

// generates a random RGB p5 color object
function randomColorRGB() {
    return color(  // returns color object
        random(255), // random red value
        random(255), // random green value
        random(255) // random blue value
    );
}

function newRandomBall() {
    return new Ball(
        random(0, width/2), // random x value in the left half of canvas
        random(0, height/2), // random y value in the top half of canvas
        random(25, 75), // random radius between 25 px and 75 px
        random(-20, 20), // random horizontal velocity between -20 and 20 (moving left or right)
        random(-20, 0), // random vertical velocity between -20 and 0 (to toss it up)
        randomColorRGB(), // random color
        GRAVITY, BOUNCE // uses global constant gravity and bounce values or consistent physics but could also be random numbers
    );
}

// when mouse clicked, drop a ball on the canvas and create another to follow the mouse
function mouseClicked() {
    balls.push(mouseBall);
    mouseBall = newRandomBall();
}

class Ball {
    constructor(x, y, radius, velocityX, velocityY, color, gravity, bounce) {
        this.x = x;
        this.y = y; // x and y coordinates of the ball on the canvas
        this.radius = radius; // the radius of the ball object
        this.velocityX = velocityX;
        this.velocityY = velocityY; // x and y velocity represent the amount of pixels per frame the ball will travel in x and y directions

        this.color = color; // color of the ball, expects a color string or a p5 color object

        this.gravity = gravity; // the the rate of change of the y velocity
        this.bounce = bounce; // the percent of velocity remaining after each bounce; expecting decimal between 0 and 1

        // TODO: convert string to color object if not already to decrease opacity over time
    }

    // draws the ball on the screen
    render() {
        stroke(0); // black outline
        strokeWeight(2); // 2px thick
        fill(this.color); // fill with the color property of the ball
        ellipse(
            this.x, this.y, // center of ellipse at x and y coordinate properties
            this.radius*2, this.radius*2 // ellipse width and height are both 2 * radius to make a circle
        );
    }

    // processes the movement of the ball
    move() {
        this.velocityY += this.gravity; // each method call increases the downwards velocity by a factor of the gravity property

        this.x += this.velocityX;
        this.y += this.velocityY; // each method call adds the x and y velocities to change the position of the ball

        if (this.x + this.radius > width) { // if the edge of the ball touches or moves past the right side of the canvas ...
            this.velocityX *= -1 * this.bounce; // invert the velocity to move ball horizontally in the other direction
            this.x = width - this.radius; // set ball so its edge is touching the the border to prevent clipping through
        } else if (this.x - this.radius < 0) { // else if the edge touches or moves past the left side of the canvas ...
            this.velocityX *= -1 * this.bounce; // invert the velocity to move ball horizontally in the other direction
            this.x = 0 + this.radius; // set ball so its edge is touching the the border to prevent clipping through
        }

        if (this.y + this.radius > height) { // if the edge of the ball touches or moves past the bottom side of the canvas ...
            this.velocityY *= -1 * this.bounce; // invert the velocity to move ball horizontally in the other direction
            this.y = height - this.radius; // set ball so its edge is touching the the border to prevent clipping through
        } else if (this.y - this.radius < 0) { // else if the edge touches or moves past the top side of the canvas ...
            this.velocityY *= -1 * this.bounce; // invert the velocity to move ball horizontally in the other direction
            this.y = 0 + this.radius; // set ball so its edge is touching the the border to prevent clipping through
        }
    }
}