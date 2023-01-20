class Puff {
    constructor(x, y, maxDiameter = 100, maxColor = 255) {
        this.x = x; // x coordinate of the puff
        this.y = y; // y coordinate of the puff
        this.maxDiameter = maxDiameter; // max diameter of the changing puff
        this.minDiameter = Math.floor(maxDiameter * (Math.random() * 0.4 + 0.5));
        this.diameterOscilator = makeOscilator(this.minDiameter, this.maxDiameter, Infinity, .25);
        this.maxColor = maxColor; // maximum gray value of the puff
        this.minColor =Math.floor(maxColor * (Math.random() * 0.5 + 0.5)); // minimum gray value of the puff
        this.colorOscilator = makeOscilator(this.minColor, this.maxColor);
    }

    drawSelf() {
        // stroke(10);
        noStroke();
        fill(this.colorOscilator.next().value);
        circle(this.x, this.y, this.diameterOscilator.next().value);
    }
}