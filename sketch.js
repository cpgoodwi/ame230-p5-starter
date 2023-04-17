// sketch.js

let table;

let minDataValue;
let maxDataValue;
let minTimeValue;
let maxTimeValue;

function preload() {
    table = loadTable("phoenix-az.csv", "csv", "header");
}

function setup() {
	createCanvas(600, 600);
    print(table);
    print(min(table.rows.map(row => row.arr[1])));
}

function draw() {
	background(128);


}
