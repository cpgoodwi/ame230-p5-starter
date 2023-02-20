// sketch.js

const numRows = 4;
const numCols = 4;
let rowHeight;
let colWidth;
let board = [];

let boardChange = false;

function setup() {
	createCanvas(600, 600);

    frameRate(15);

    // initialize board of tiles
    rowHeight = height / numRows;
    colWidth = width / numCols;

    let value = numRows * numCols - 1;

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
}

function draw() {
	background(128);

    // debugBoard();

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
}

function drawBoard() {
    textSize(32);
    stroke(0);
    strokeWeight(2);
    // rectMode(CORNERS);
    for (let row in board) {
        for (let col in board[row]) {
            let tile = board[row][col];
            let leftX = col * colWidth;
            let topY = row * rowHeight;
            fill(tile.color);
            rect(
                leftX, topY,
                colWidth, rowHeight
            );
            text(
                tile.value,
                leftX + 16, topY + rowHeight - 16
            );
        }
    }
}

function debugBoard() {
    if (boardChange) {
        let boardValues = "";
        for (const row of board) {
            const values = row.map((tile) => tile.value).join("\t");
            // print(values);
            boardValues += values + "\n";
        }
        print(boardValues);

        boardChange = false;
    }
}

function mouseClicked() {
    cellRow = floor(mouseY / rowHeight);
    cellCol = floor(mouseX / colWidth);
    move(cellRow, cellCol);
    // print(board[cellRow][cellCol].value);
}

function move(selectedRow, selectedCol) {

    const directions = {
        "north": {
            tile: null,
            modifier: {row: -1, col: 0}
        },
        "east": {
            tile: null,
            modifier: {row: 0, col: 1}
        },
        "south": {
            tile: null,
            modifier: {row: 1, col: 0}
        },
        "west": {
            tile: null,
            modifier: {row: 0, col: -1}
        }
    }

    if (selectedRow > 0)
        directions["north"].tile = board[selectedRow - 1][selectedCol];

    if (selectedCol < numCols - 1)
        directions["east"].tile = board[selectedRow][selectedCol + 1];

    if (selectedRow < numRows - 1)
        directions["south"].tile = board[selectedRow + 1][selectedCol];

    if (selectedCol > 0)
        directions["west"].tile = board[selectedRow][selectedCol - 1];
    
    for (let dir in directions) {
        if (directions[dir].tile !== null && directions[dir].tile.value === 0) {
            // swap tiles
            let tempTile = board[selectedRow][selectedCol];
            board[selectedRow][selectedCol] = board[selectedRow + directions[dir].modifier.row][selectedCol + directions[dir].modifier.col];
            board[selectedRow + directions[dir].modifier.row][selectedCol + directions[dir].modifier.col] = tempTile;
            boardChange = true;
            break;
        }
    }

    // for (const row of board) {
    //     const values = row.map((tile) => tile.value).join("\t");
    //     print(values);
    // }
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