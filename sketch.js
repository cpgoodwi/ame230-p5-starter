// sketch.js

let state, quine, flat, charIterator, renderedText, codeHeight, codeWidth;

function preload() {
	quine = loadStrings("sketch.js");
}

function setup() {
	createCanvas(600, 800);
	noStroke();
    colorMode(HSB);
    textFont("Inconsolata"); // my programming font from google fonts

	flat = [], renderedText = [];
	// font height and width are hardcoded to prevent kerning issues
	codeHeight = 11, codeWidth = codeHeight / 2;

	let y = 0;
	for (const line of quine) {
		let x = 0;
		for (const char of line) {
			flat.push(new Character(x, y, char));
			x += char === "\t" ? 4 * codeWidth : codeWidth;
		}
		y += codeHeight;
	}
	charIterator = iterator(0, flat.length - 1);
}

function draw() {
	background("#010112");

    fill(millis() / 2 % 360, 100, 100);
    textSize(32);
    text("type to program", 300, 100);

	translate(codeWidth * 8, codeHeight);

    fill("chartreuse");
    textSize(codeHeight);
	renderedText.forEach(char => text(char.char, char.x, char.y));
}

function keyPressed() {
	let index = charIterator.next();
	if (!index.done)
		renderedText.push(flat[index.value]);
    else { // iterator is complete
        renderedText = []; // reset rendered text
        charIterator = iterator(0, flat.length - 1); // reset iterator
        return; // don't try next character
    }
    if (!index.done) { // try two steps at a time
        index = charIterator.next(); renderedText.push(flat[index.value]);
    }
}

function* iterator(start = 0, end = Infinity, step = 1) {
	let count = 0;
	for (let i = start; i < end; i += step) {
		count++;
		yield i;
	}
	return count;
}

class Character {
	constructor(x, y, char) {
		this.x = x, this.y = y, this.char = char;
	}
}