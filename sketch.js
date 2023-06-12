// sketch.js

let emojis = [];

function setup() {
	createCanvas(600, 600);

    for (i = 0; i < 200; i++) {
        emojis.push(new Emoji(random(width), random(height)));
    }
}

function draw() {
	background(128);

    emojis.forEach(emoji => emoji.render());

    textFont("Verdana");
    textSize(48);
    textAlign(RIGHT);
    text("FINAL", width - 5, 100);
}

function fahrenheit2Kelvin(tempF) {
    return (tempF - 32) * (5 / 9) + 273.15;
}

class Emoji {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.value = String.fromCodePoint(0x1f600 + floor(random(80)));
    }
    render() {
        textFont('Verdana');
        textSize(40);
        textAlign(CENTER);
        text(this.value, this.x, this.y);
    }
}