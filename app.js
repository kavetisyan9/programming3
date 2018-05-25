var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require('fs');
var Grass = require("./public/class.grass.js");
var Xotaker = require("./public/class.xotaker.js");
var Gishatich = require("./public/class.gishatich.js");
var Mard = require("./public/class.mard.js");
var Mardaker = require("./public/class.mardaker.js");

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.redirect("public");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});

global.grassArr = [];
global.xotakerArr = [];
global.gishatichArr = [];
global.mardArr = [];
global.mardakerArr = [];

global.w = 30;
global.h = 30;
global.side = 22;

global.matrix = [];

global.exanak = "garun";
io.emit("send weather", exanak);


function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.random(100);
            if (r < 20) r = 0;
            else if (r < 55) r = 1;
            else if (r < 85) r = 2;
            else if (r < 95) r = 3;
            else if (r < 99) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}

matrix = genMatrix(w, h);

io.on("connection", function (socket) {

    var grassArr = [], xotakerArr = [], gishatichArr = [], mardArr = [], mardakerArr = [];

    setInterval(function () {
        for (var y in matrix) {
            for (var x in matrix[y]) {
                if (matrix[y][x] == 1) {
                    grassArr.push(new Grass(x * 1, y * 1, 1));
                }
                else if (matrix[y][x] == 2) {
                    var ser = (Math.round(Math.random())) / 2;
                    xotakerArr.push(new Xotaker(x * 1, y * 1, 2 + ser, ser));
                    matrix[y][x] += ser;
                }
                else if (matrix[y][x] == 3) {
                    var ser = (Math.round(Math.random())) / 2;
                    gishatichArr.push(new Gishatich(x * 1, y * 1, 3 + ser, ser));
                    matrix[y][x] += ser;
                }
                else if (matrix[y][x] == 4) {
                    var ser = (Math.round(Math.random())) / 2;
                    mardArr.push(new Mard(x * 1, y * 1, 4 + ser, ser));
                    matrix[y][x] += ser;
                }
                else if (matrix[y][x] == 5) {
                    var ser = (Math.round(Math.random())) / 2;
                    mardakerArr.push(new Mardaker(x * 1, y * 1, 5 + ser, ser));
                    matrix[y][x] += ser;
                }
            }
        }

        io.sockets.emit("send matrix", matrix);

        for (var i in grassArr) {
            grassArr[i].mul();
        }
        io.emit("send grassArr", grassArr);

        for (var i in xotakerArr) {
            xotakerArr[i].bazmanal();
            xotakerArr[i].utel();
            xotakerArr[i].mahanal();
        }
        io.emit("send xotakerArr", xotakerArr);

        for (var i in gishatichArr) {
            gishatichArr[i].bazmanal();
            gishatichArr[i].utel();
            gishatichArr[i].mahanal();
        }
        io.emit("send gishatichArr", gishatichArr);

        for (var i in mardArr) {
            mardArr[i].bazmanal();
            mardArr[i].utelXot();
            mardArr[i].utelXotaker();
            mardArr[i].mahanal();
        }
        io.emit("send mardArr", mardArr);


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
        io.emit("send mardakerArr", mardakerArr);
    }, 100);
});


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
    io.emit("send weather", exanak);

}
setInterval(poxelExanak, 3000);



var statistics = {
    "Grass": grassArr.length,
    "Xotaker": xotakerArr.length,
    "Gishatich": gishatichArr.length,
    "Mard": mardArr.length,
    "Mardaker": mardakerArr.length
}

setInterval(function () {
    statistics["Grass"] = grassArr.length;
    statistics["Xotaker"] = xotakerArr.length;
    statistics["Gishatich"] = gishatichArr.length;
    statistics["Mard"] = mardArr.length;
    statistics["Mardaker"] = mardakerArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function (err) {
        if (err) throw err;
    })}, 12000);
