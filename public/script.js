socket = io();

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

socket.on("send weather", function (data) {
    exanak = data;
    document.getElementById("exanak").innerHTML ="Exanak:"+ exanak;
    //fill(0);
    //textSize(24);
    //text("Exanak:" + exanak, 10, 745);
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
        document.getElementById("exanak").innerHTML ="";
    }
}





function bodyClick(evt) {
    if (evt.pageX <= side * w && evt.pageY <= side * h) {
        m = Math.floor(evt.pageX / side);
        n = Math.floor(evt.pageY / side);

        directions = [
            [m, n],
            [m - 1, n - 1],
            [m, n - 1],
            [m + 1, n - 1],
            [m - 1, n],
            [m - 1, n + 1],
            [m, n + 1],
            [m + 1, n + 1],
            [m + 1, n]
        ]

        for (k in directions) {
            var a = directions[k][0];
            var b = directions[k][1];

            if (a >= 0 && a < matrix[0].length && b >= 0 && b < matrix.length) {

                if (matrix[a][b] == 1) {
                    for (var m in grassArr) {
                        if (grassArr[m].x == a && grassArr[m].y == b) {
                            grassArr.splice(m, 1);
                        }
                    }
                    socket.emit('sending updated grassArr', grassArr);
                }
                else if (matrix[a][b] == 2 || matrix[a][b] == 2.5) {
                    for (var m in xotakerArr) {
                        if (xotakerArr[m].x == a && xotakerArr[m].y == b) {
                            xotakerArr.splice(m, 1);
                        }
                    }
                    socket.emit('sending updated xotakerArr', xotakerArr);
                }
                else if (matrix[a][b] == 3 || matrix[a][b] == 3.5) {
                    for (var m in gishatichArr) {
                        if (gishatichArr[m].x == a && gishatichArr[m].y == b) {
                            gishatichArr.splice(m, 1);
                        }
                    }
                    socket.emit('sending updated gishatichArr', gishatichArr);
                }
                else if (matrix[a][b] == 4 || matrix[a][b] == 4.5) {
                    for (var m in mardArr) {
                        if (mardArr[m].x == a && mardArr[m].y == b) {
                            mardArr.splice(m, 1);
                        }
                    }
                    socket.emit('sending updated mardArr', mardArr);
                }
                else if (matrix[a][b] == 5) {
                    for (var m in mardakerArr) {
                        if (mardakerArr[m].x == a && mardakerArr[m].y == b) {
                            mardakerArr.splice(m, 1);
                        }
                    }
                    socket.emit('sending updated mardakerArr', mardakerArr);
                }
                matrix[b][a] = 0;
            }
        }

        socket.emit('updated matrix', matrix);
    }
}
window.onclick = bodyClick;


