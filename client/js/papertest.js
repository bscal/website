class Cell extends paper.Shape.Rectangle {
    constructor(startPoint, size, x, y) {
        super(startPoint, size);
        this.fillColor = "black";
        this.isLiving = false;
        this.nextState = false;
        this.x = x;
        this.y = y;
    }
}

// Setup Convas and paper.js
paper.install(window);
var canvas = document.getElementById("canvas1");
paper.setup(canvas);

var rectList = []
var width = 114;
var height = 64;
var tileWidth = 12;
var tileHeight = 12;
var startPoint = new Point(tileWidth, tileHeight);
var size = new Size(tileWidth, tileHeight);
var paused = true;

// var btnText = new PointText(buttonPoint.add([32, 20]));
// btnText.content = "Pause"
// btnText.justification = "center";
// btnText.fontSize = 16;

// Init grid
for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
        var shape = new Cell(startPoint, size, x, y);
        shape.onMouseEnter = function (event) {
            this.strokeColor = "red";
            this.strokeWidth = 2;
            uiText.content = `${this.x} / ${this.y}`;
        }
        shape.onMouseLeave = function (event) {
            this.strokeColor = null;
        }
        shape.onClick = function (event) {
            this.isLiving = true;
            this.nextState = true;
            this.fillColor = "white";
        }
        shape.onDoubleClick = function (event) {
            this.isLiving = false;
            this.nextState = false;
            this.fillColor = "black";
        }
        rectList.push(shape);

        startPoint = startPoint.add([tileWidth, 0]);
    }
    startPoint = startPoint.add([-width * tileWidth, tileHeight]);
}

var buttonPoint = new Point(view.size.width - 128, 16);
var btnPause = new Shape.Rectangle(buttonPoint, new Size(64, 32));
btnPause.fillColor = "green";
btnPause.onClick = function (event) {
    if (paused) {
        this.fillColor = "red";
        paused = false;
    } else {
        this.fillColor = "green";
        paused = true;
    }
}

var uiPoint = new Point(view.size.width - 128, 80);
var uiText = new PointText(uiPoint);
uiText.content = "0/0"
uiText.fontSize = 20;

// RENDER
paper.view.draw();

setInterval(function () {
    if (!paused) {

        // Gets each cell neightbor count and sets the cell's nextState;
        for (var i = 0; i < rectList.length; i++) {
            var cell = rectList[i];

            var num = neightborCount(cell);
            if (num < 2) {
                cell.nextState = false;
            } else if (num > 3) {
                cell.nextState = false;
            } else if (num == 3) {
                cell.nextState = true;
            } else if (num == 2) {
                if (cell.isLiving) {
                    cell.nextState = true;
                } else {
                    cell.nextState = false;
                }
            }
        }

        // Sets new life state and updates colors
        for (var i = 0; i < rectList.length; i++) {
            cell = rectList[i];
            cell.isLiving = cell.nextState;
            // Sets the Color of the cell
            if (cell.isLiving) {
                cell.fillColor = "white";
            } else {
                cell.fillColor = "black";
            }
        }
    }
}, 50);

function neightborCount(pos) {
    var count = 0;
    for (var y = pos.y - 1; y < pos.y + 2; y++) {
        if (y < 0 || y > height - 1) {
            continue;
        }
        for (var x = pos.x - 1; x < pos.x + 2; x++) {
            if (x < 0 || x > width - 1) {
                continue;
            }
            if (pos.x == x && pos.y == y) {
                continue;
            }
            var neighborCell = rectList[x + y * width];
            if (neighborCell.isLiving) {
                count++;
            }
        }
    }
    return count;
}