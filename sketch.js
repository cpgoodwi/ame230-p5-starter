// sketch.js

const numRows = 4;
const numCols = 4;
let rowHeight;
let colWidth;
let board = [];

function setup() {
	createCanvas(600, 600);

    frameRate(15);

    // initialize board of tiles
    rowHeight = height / numRows;
    colWidth = width / numCols;

    let value = 15;

    for (let row = 0; row < numRows; row++) {
        let boardRow = [];
        for (let col = 0; col < numCols; col++) {
            boardRow.push(new Tile("red", value,
                col*colWidth,
                row*rowHeight,
                (col + 1)*colWidth,
                (row + 1)*rowHeight)
            );
            value--;
        }
        board.push(boardRow);
    }

    // print(board);
}

function draw() {
	background(128);

    drawBoard();
}

class Tile {
    constructor(color, value, leftX, topY, rightX, bottomY) {
        this.color = color;
        this.value = value;
        this.leftX = leftX;
        this.topY = topY;
        this.rightX = rightX;
        this.bottomY = bottomY;
    }

    // TODO: change this to a function outside of the Tile class because the tile class shouldn't know about other tiles
    move() {
        // let north = undefined, south = undefined, east = undefined, west = undefined;
        let directions = {
            "north": null,
            "south": null,
            "east": null,
            "west": null
        };
        let cellRow = floor(mouseY / rowHeight);
        let cellCol = floor(mouseX / colWidth);

        // print("row, col", cellRow, cellCol);

        if (cellRow > 0)
            directions["north"] = board[cellRow - 1][cellCol];

        if (cellRow < numRows - 1)
            directions["south"] = board[cellRow + 1][cellCol];

        if (cellCol > 0)
            directions["west"] = board[cellRow][cellCol - 1];

        if (cellCol < numCols - 1)
            directions["east"] = board[cellRow][cellCol + 1];

        for (let dir in directions) {
            if (directions[dir] !== null) {
                // print(dir ,directions[dir].value);
                if (directions[dir].value === 0) {
                    print(dir, directions[dir]);
                    swapTiles(cellRow, cellCol, dir);
                    break;
                }
            }
        }
            

        if (this.color === "red")
            this.color = "green";
        else
            this.color = "red";
    }
}

function drawBoard() {
    stroke(0);
    strokeWeight(2);
    rectMode(CORNERS);
    for (const row of board) {
        for (const cell of row) {
            fill(cell.color);
            rect(
                cell.leftX, cell.topY,
                cell.rightX, cell.bottomY
            );
            
            textSize(32);
            text(cell.value,
                cell.leftX + 16, cell.bottomY - 16
            );
        }
    }
}

function mouseClicked() {
    cellRow = floor(mouseY / rowHeight);
    cellCol = floor(mouseX / colWidth);
    board[cellRow][cellCol].move();
    print(board[cellRow][cellCol].value);
}

function swapTiles(selectedRow, selectedCol, direction) {
    let tempTile = board[selectedRow][selectedCol];
    print("swapping tiles", direction, tempTile);

    switch (direction) {
        case "north":
            board[selectedRow][selectedCol] = board[selectedRow - 1][selectedCol];
            board[selectedRow - 1][selectedCol] = tempTile;
            break;
        case "south":
            board[selectedRow][selectedCol] = board[selectedRow + 1][selectedCol];
            board[selectedRow + 1][selectedCol] = tempTile;
            break;
        case "east":
            board[selectedRow][selectedCol] = board[selectedRow][selectedCol + 1];
            board[selectedRow][selectedCol + 1] = tempTile;
            break;
        case "west":
            board[selectedRow][selectedCol] = board[selectedRow][selectedCol - 1];
            board[selectedRow][selectedCol - 1] = tempTile;
            break;
    }

    // TODO: solve number change bug
    drawBoard();
}