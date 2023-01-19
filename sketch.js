// sketch.js

function setup() {
	createCanvas(600, 600);

}

function draw() {
	background("MidnightBlue"); // make background dark blue

    // draw moon
    let moonX = 450;
    let moonY = 150;
    let moonW = 200;
    let moonH = 200;

    noStroke();
    fill(250);
    ellipse(
        moonX, moonY,
        moonW, moonH
    );

    fill("MidnightBlue"); // same as background
    ellipse(
        moonX + 20, moonY - 20,
        moonW * .9, moonH * 0.9
    );

    // make horizon line
    let horizonX = 0;
    let horizonY = 300;

    let darkGreen = "#005000";

    noStroke();
    fill(darkGreen);
    rect(
        horizonX, horizonY,
        600, 300
    );
}

/**
 * VARIABLE NOTES
 * 
 * Variables are used to store information
 * 
 * variables assoiciate a name with a value
 *  
 *  let angle = 0;
 *  let iconWidth = 100;
 * 
 *  let message = "hello!";
 * 
 * When a value has been assoicaited with a variable, we can access it using the variable name.
 * 
 *  rotate(angle);
 * 
 * The value associate with a variable can be changed
 *  
 *  message = 'bonjour!';
 * 
 * Declaring a variable name twice causes an error.
 * 
 *  let angle = 0;
 *  let angle = 100; // Syntax error
 * 
 * Variable names
 *  Variable names in JavaScript must contain only letters, digits, or the sympbols $ and _.
 *  The first character in a name cannot be a digit
 *  Case is significant!
 *  There are some reserved words which cannot be used as variable names because they are used by JavaScript. e.g. let, class, and function
 * 
 * A constant can be delcared using const instead of let
 *  const state = "Arizona";
 * A constant variable cannot be changed
 * 
 * Every value is of a cetain type.
 * 
 * Number - in js, the Number type is used to represent both integers (whole numbers) and floating point numbers (numbers with a decimal point)
 * String - words and letters denoted with quotes '', "", and ``
 * Boolean - true/false
 * 
 * Names are important
 * 
 * You must avoid key words already used by JavaScript
 * Be thoughtful about your names, and choose ones that have meaning
 * Choose a convention for compoint names, and be consistent
 *  highScore - camelCase
 *  high_score - snake_case
 *  HighScore - PascalCase
 *  high-score - kebab-case
 * Begin with a lowercase letter. Starting with an upper case letter is reserved for class names.
 *  (not really but you should follow that convention)
 * 
 * Creating good names will make your program easier to understand.
 * for example, you need a variable for the horizontal position of the front wheel in a drawing of a vehicle
 *  x, circleX, or frontWheelX
 * are possible names you might come up with.
 */
