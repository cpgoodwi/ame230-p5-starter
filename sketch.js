// sketch.js

let mouseHistory;
let maxHistoryCount;

function setup() {
	createCanvas(600, 600);
    frameRate(30);

    mouseHistory = [];
    maxHistoryCount = 100;
}

function draw() {
	background(0);

    for (let i in mouseHistory) {
        mouseHistory[i].move();
        mouseHistory[i].render();
    }
}

function mouseDragged() {
    let distance = dist(mouseX, mouseY, pmouseX, pmouseY);
    let n = ceil(map(distance, 0, 100, 1, 20));

    let dx = (mouseX - pmouseX);
    let dy = (mouseY - pmouseY);

    for (let i = 0; i < n; i++) {
        let t = map(i, 0, n, 0, 1);
        let x = pmouseX + dx * t;
        let y = pmouseY + dy * t;

        mouseHistory.push(new Point2(
            x, y,
            dx*0.25, dy*0.25
        ));
    }

    if (mouseHistory.length > maxHistoryCount) {
        mouseHistory.shift();
    }
}

class Point2 {
    constructor(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color("chartreuse");
        this.alpha = 255;
        this.size = random(10, 40);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= 0.98;
        this.dy *= 0.98;
        this.size += 0.2;
        this.alpha -= 255 / maxHistoryCount;
    }

    render() {
        this.color.setAlpha(this.alpha);
        // stroke(0);
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }
}