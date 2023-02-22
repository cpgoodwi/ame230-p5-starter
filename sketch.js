// sketch.js

const balls = []; // const array to store balls and I only need one
const GRAVITY = 1;
const BOUNCE = 0.8;

function setup() {
	createCanvas(600, 600);

    let constantBall = new Ball(
        450, 300, // start at coordinates (450, 300) on canvase; right side at half height
        80, // radius of 80 pixels
        10, // initial x velocity is moving 10 pixels per frame to the right
        -10, // initial y velocity is moving 10 pixels per frame upwards
        "chartreuse", // the color is set to chartreuse
        GRAVITY, BOUNCE // uses global constant gravity and bounce values for consistent physics
    );

    let randomBall = new Ball(
        random(50, 300), // random x value in the left half of canvas
        random(50, 300), // random y valye in the top half of canvas
        random(50, 100), // random radius between 50 px and 100 px
        random(-20, 20), // random horizontal velocity between -20 and 20 (moving left or right)
        random(-20, 0), // random vertical velocity between -20 and 0 (to toss it up)
        randomColorRGB(), // random color
        GRAVITY, BOUNCE // uses global constant gravity and bounce values or consistent physics but could also be random numbers
    );

    balls.push(constantBall);
    balls.push(randomBall);
}

function draw() {
    background(128);

    for (let i = 0; i < balls.length; i++) {
        balls[i].move();
        balls[i].render();
    }

    // noLoop();
}

// generates a random RGB p5 color object
function randomColorRGB() {
    return color(
        random(255),
        random(255),
        random(255)
    );
}

class Ball {
    // creates the ball object in memory with parameters for each property; color can be a HTML color string or a p5 color object.
    constructor(x, y, radius, velocityX, velocityY, color, gravity, bounce) {
        this.x = x;
        this.y = y; // x and y coordinates of the ball on the canvas
        this.radius = radius;
        this.velocityX = velocityX;
        this.velocityY = velocityY; // x and y velocity represent the amount of pixels per frame the ball will travel in x and y directions
        this.color = color; // color of the ball, expects a color string or a p5 color object
        this.gravity = gravity; // the the rate of change of the y velocity
        this.bounce = bounce; // the amount of energy remaining after each bounce
    }

    // draws the ball on the screen
    render() {
        stroke(0); // black line
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
            this.velocityX *= -1; // invert the velocity to move ball horizontally in the other direction
            this.x = width - this.radius; // set ball so its edge is touching the the border to prevent clipping through
        } else if (this.x - this.radius < 0) { // else if the edge touches or moves past the left side of the canvas ...
            this.velocityX *= -1; // invert the velocity to move ball horizontally in the other direction
            this.x = 0 + this.radius; // set ball so its edge is touching the the border to prevent clipping through
        }

        if (this.y + this.radius > height) { // if the edge of the ball touches or moves past the bottom side of the canvas ...
            this.velocityY *= -1; // invert the velocity to move ball horizontally in the other direction
            this.y = height - this.radius; // set ball so its edge is touching the the border to prevent clipping through
        } else if (this.y - this.radius < 0) { // else if the edge touches or moves past the top side of the canvas ...
            this.velocityY *= -1; // invert the velocity to move ball horizontally in the other direction
            this.y = 0 + this.radius; // set ball so its edge is touching the the border to prevent clipping through
        }
    }
}