socket = io.connect('http://localhost:3000');

var matrix = [];

socket.on("send matrix", function (data) {
    matrix = [];
    for (i in data) {
        matrix.push(data[i]);
    }
});


var w = 30;
var h = 30;
var side = 24;

var grassArr = [], xotakerArr = [], gishatichArr = [], mardArr = [], mardakerArr = [];


socket.on("send grassArr", function (data) {
    grassArr = data;
});
socket.on("send xotakerArr", function (data) {
    xotakerArr = data;
});
socket.on("send gishatichArr", function (data) {
    gishatichArr = data;
});
socket.on("send mardArr", function (data) {
    mardArr = data;
});
socket.on("send mardakerArr", function (data) {
    mardakerArr = data;
});

var exanak = "garun";

socket.on("sending weather", function (data) {
    exanak = data;
    fill(0);
    textSize(24);
    text("Exanak:" + exanak, 10, 745);
});

var matrix;

function setup() {
    createCanvas(side * w, side * (h + 1.5));
    background("#acacac");
    frameRate(5);

}

function draw() {

    for (var y in matrix) {
        for (var x in matrix[y]) {
            if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 1) {
                if (exanak == "garun") {
                    fill("green");
                }
                else if (exanak == "amar") {
                    fill("#00bb00");
                }
                else if (exanak == "ashun") {
                    fill("#799602");
                }
                else if (exanak == "dsmer") {
                    fill("#CEE56E");
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#fdd17f");
            }
            else if (matrix[y][x] == 5) {
                fill("#0099ff");
            }
            rect(x * side, y * side, side, side);
        }
    }


    if (grassArr.length == 900 || (grassArr.length == 0 && xotakerArr.length == 0 && gishatichArr.length == 0 && mardArr.length == 0 && mardakerArr.length == 0)) {
        background("#acacac");
        textSize(60);
        fill(0);
        textAlign(CENTER);
        text("GAME OVER", 360, 370);
    }
}