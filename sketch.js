// sketch.js

let quine, flatQuine, charIterator, renderedText, textSizeValue;

function preload() {
	quine = loadStrings("sketch.js");
}

function setup() {
	createCanvas(600, 800);

	fill("chartreuse");
	noStroke();

	flatQuine = [], renderedText = [], textSizeValue = 13;

	textFont("Inconsolata"); // my programming font from google fonts api
	textSize(textSizeValue);

	let y = 0;
	for (const line of quine) {
		let x = 0;
		for (const char of line) {
			flatQuine.push(new Character(x, y, char));
			x += char === "\t" ? 4 * textWidth(char) : textWidth(char);
		}
		y += textSizeValue;
	}
	charIterator = iterator(0, flatQuine.length);
}

function draw() {
	background("#010112");
	translate(0, textSizeValue);

	let index = charIterator.next();
	if (!index.done) {
		renderedText.push(flatQuine[index.value]);
	}

	renderedText.forEach(char => text(char.char, char.x, char.y));
}

// c̵o̵p̵i̵e̵d̵ borrowed from mdn web docs iterators and generators tutorial
function* iterator(start = 0, end = Infinity, step = 1) {
	let count = 0;
	for (let i = 0; i < end; i += step) {
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