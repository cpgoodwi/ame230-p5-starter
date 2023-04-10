// sketch.js

let quine, flat, charIterator, renderedText, codeSize;

function preload() {
	quine = loadStrings("sketch.js");
}

function setup() {
	createCanvas(600, 800);

	fill("chartreuse");
	noStroke();

	flat = [], renderedText = [], codeSize = 12;

	textFont("Inconsolata"); // my programming font from google fonts
	textSize(codeSize);

	let y = 0;
	for (const line of quine) {
		let x = 0;
		for (const char of line) {
			flat.push(new Character(x, y, char));
			x += char === "\t" ? 4 * textWidth(char) : textWidth(char);
		}
		y += codeSize;
	}
	charIterator = iterator(0, flat.length);
}

function draw() {
	background("#010112");
	translate(0, codeSize);

	renderedText.forEach(char => text(char.char, char.x, char.y));
}

function keyPressed() {
	let index = charIterator.next();
	if (!index.done) {
		renderedText.push(flat[index.value]);
	}
}

// borrowed from mdn web docs iterators and generators tutorial
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
		this.x = x;
		this.y = y;
		this.char = char;
	}
}