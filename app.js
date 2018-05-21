var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var side = 24;

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});
var matrix = [];
function genMatrix(info) {
    for (var y = 0; y < info[0]; y++) {
        matrix[y] = [];
        for (var x = 0; x < info[1]; x++) {
            var r = Math.random(100);
            if (r < 20) r = 0;
            else if (r < 60) r = 1;
            else if (r < 85) r = 2;
            else if (r < 95) r = 3;
            else if (r < 99) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

var exanak = "garun";
function poxelExanak() {
    if (exanak == "garun") {
        exanak = "amar";
    }
    else if (exanak == "amar") {
        exanak = "ashun";
    }
    else if (exanak == "ashun") {
        exanak = "dsmer";
    }
    else if (exanak == "dsmer") {
        exanak = "garun";
    }
}
setInterval(poxelExanak, 3000);

function draww() {
    background("#acacac");
    fill(0);
    textSize(24);
    text("Exanak:" + exanak, 10, 745);
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
    for (var i in arrays[0]) {
        arrays[0][i].mul();
    }

    for (var i in arrays[1]) {
        arrays[1][i].bazmanal();
        arrays[1][i].utel();
        arrays[1][i].mahanal();
    }
    for (var i in arrays[2]) {
        arrays[2][i].bazmanal();
        arrays[2][i].utel();
        arrays[2][i].mahanal();
    }
    for (var i in arrays[3]) {
        arrays[3][i].bazmanal();
        arrays[3][i].utelXot();
        arrays[3][i].utelXotaker();
        arrays[3][i].mahanal();
    }

    for (var i in arrays[4]) {
        if (exanak == "ashun" || exanak == "dsmer") {
            arrays[4][i].mahanal();
        }
        else {
            arrays[4][i].bazmanal();
            arrays[4][i].utelGishatich();
            arrays[4][i].utelMard();
            arrays[4][i].mahanal();
        }
    }


    if (arrays[0].length == 900 || (arrays[0].length == 0 && arrays[1].length == 0 && arrays[2].length == 0 && arrays[3].length == 0 && arrays[4].length == 0)) {
        background("#acacac");
        textSize(60);
        fill(0);
        textAlign(CENTER);
        text("GAME OVER", 360, 370);
    }
}

io.on('connection', function (socket) {

    socket.on("send info", genMatrix);
    io.sockets.emit("send matrix", matrix);
    socket.on("send arrays", draww);
    

});






/*function draww() {
    background("#acacac");
    fill(0);
    textSize(24);
    text("Exanak:" + exanak, 10, 745);
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
    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in xotakerArr) {
        xotakerArr[i].bazmanal();
        xotakerArr[i].utel();
        xotakerArr[i].mahanal();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].bazmanal();
        gishatichArr[i].utel();
        gishatichArr[i].mahanal();
    }
    for (var i in mardArr) {
        mardArr[i].bazmanal();
        mardArr[i].utelXot();
        mardArr[i].utelXotaker();
        mardArr[i].mahanal();
    }

    for (var i in mardakerArr) {
        if (exanak == "ashun" || exanak == "dsmer") {
            mardakerArr[i].mahanal();
        }
        else {
            mardakerArr[i].bazmanal();
            mardakerArr[i].utelGishatich();
            mardakerArr[i].utelMard();
            mardakerArr[i].mahanal();
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
*/