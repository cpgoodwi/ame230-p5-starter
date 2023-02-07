// sketch.js

let stop = false;

function setup() {
	createCanvas(600, 600);
    frameRate(4);

}

function draw() {
	background(128);

    let x = 0;
    let y = 0;
    let size = 50;
    let padding = 2;

    let rowCount = 0;
    while (y < height) {
        x = 0;
        let colCount = 0;

        while (x < width) {

            // draw ONE tile

            let x1 = x + padding;
            let y1 = y + padding;
            let size1 = size - padding * 2;

            stroke(0);
            strokeWeight(1);
            // noFill();

            // fill(rowCount % 2 ? "red" : "white");
            fill(
                random(0, 255),
                random(0, 255),
                random(0, 255)
            );
            rect(
                x1, y1,
                size1, size1
            );

            // line(
            //     x1, y1,
            //     x1 + size1, y1 + size1
            // );

            // line(
            //     x1 + size1, y1,
            //     x1 , y1 + size1
            // );

            x += size;
            colCount++;
        }

        y += size;
        rowCount++;
    }

    if (stop)
        noLoop();
    // end of draw function
}

function mouseClicked() {
    stop = !stop;
}