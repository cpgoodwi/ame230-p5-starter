
class Cloud {
    constructor(x, y, width, height, density = 20, puffXVariance = 10, puffYVariance = 10) {
        this.x = x; // x coordinate of the center base of the cloud
        this.y = y; // y coordinate of the center base of the cloud
        this.width = width; // the width at the base of the cloud in terms of puffs
        this.height = height; // the height to the top of the cloud in terms of puffs
        this.density = density; // the distance between puffs
        this.puffXVariance = puffXVariance // the X variation of the puffs around their center point
        this.puffYVariance = puffYVariance // the Y variation of the puffs around their center point

        // TODO: make this shape like a cloud
        this.puffs = [];
        for (let i = 0; i < this.width; i++) {
            let puffRow = [];
            for (let j = 0; j < this.height; j++) {
                puffRow.push(new Puff(
                    x + i * density + (Math.random() * density),
                    y + j * density + (Math.random() * density),
                ));
            }
            this.puffs.push(puffRow);
        }
    }

    drawSelf() {
        for (const row of this.puffs) {
            for (const puff of row) {
                puff.drawSelf();
            }
        }
    }
}