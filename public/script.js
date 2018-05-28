socket = io();
var matrix = [];
var w = 30;
var h = 30;
var side = 24;
var grassArr = [], xotakerArr = [], gishatichArr = [], mardArr = [], mardakerArr = [];

socket.on("send matrix", function (data) {
    matrix = [];
    for (i in data) {
        matrix.push(data[i]);
    }
});

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

socket.on("send weather", function (data) {
    exanak = data;
    document.getElementById("exanak").innerHTML = "Exanak:" + exanak;
});

var matrix;

function setup() {
    createCanvas(side * w, side * h);
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

function paytyun(evt) { //click aneluc heto petq e nshvac vandaki ev koxqi 8 vandakneri bolor kerparnery veranan 
    if (evt.pageX <= side * w && evt.pageY <= side * h) {
        coordX = Math.floor(evt.pageX / side);
        coordY = Math.floor(evt.pageY / side);
        directions = [
            [coordX, coordY],
            [coordX - 1, coordY - 1],
            [coordX, coordY - 1],
            [coordX + 1, coordY - 1],
            [coordX - 1, coordY],
            [coordX - 1, coordY + 1],
            [coordX, coordY + 1],
            [coordX + 1, coordY + 1],
            [coordX + 1, coordY]
        ]

        for (k in directions) {

            if (directions[k][0] >= 0 && directions[k][0] < matrix[0].length && directions[k][1] >= 0 && directions[k][1] < matrix.length) {
                if (matrix[directions[k][0]][directions[k][1]] == 1) {
                    for (var coordX in grassArr) {
                        if (grassArr[coordX].x == directions[k][0] && grassArr[coordX].y == directions[k][1]) {
                            grassArr.splice(coordX, 1);
                        }
                    }
                    socket.emit("new grassArr", grassArr);
                }
                else if (matrix[directions[k][0]][directions[k][1]] == 2 || matrix[directions[k][0]][directions[k][1]] == 2.5) {
                    for (var coordX in xotakerArr) {
                        if (xotakerArr[coordX].x == directions[k][0] && xotakerArr[coordX].y == directions[k][1]) {
                            xotakerArr.splice(coordX, 1);
                        }
                    }
                    socket.emit("new xotakerArr", xotakerArr);
                }
                else if (matrix[directions[k][0]][directions[k][1]] == 3 || matrix[directions[k][0]][directions[k][1]] == 3.5) {
                    for (var coordX in gishatichArr) {
                        if (gishatichArr[coordX].x == directions[k][0] && gishatichArr[coordX].y == directions[k][1]) {
                            gishatichArr.splice(coordX, 1);
                        }
                    }
                    socket.emit("new gishatichArr", gishatichArr);
                }
                else if (matrix[directions[k][0]][directions[k][1]] == 4 || matrix[directions[k][0]][directions[k][1]] == 4.5) {
                    for (var coordX in mardArr) {
                        if (mardArr[coordX].x == directions[k][0] && mardArr[coordX].y == directions[k][1]) {
                            mardArr.splice(coordX, 1);
                        }
                    }
                    socket.emit("new mardArr", mardArr);
                }
                else if (matrix[directions[k][0]][directions[k][1]] == 5) {
                    for (var coordX in mardakerArr) {
                        if (mardakerArr[coordX].x == directions[k][0] && mardakerArr[coordX].y == directions[k][1]) {
                            mardakerArr.splice(coordX, 1);
                        }
                    }
                    socket.emit("new mardakerArr", mardakerArr);
                }
                matrix[directions[k][1]][directions[k][0]] = 0;
            }
        }
        socket.emit("new matrix", matrix);
    }
}
window.onclick = paytyun;


