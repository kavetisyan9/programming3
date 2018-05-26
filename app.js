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

global.cnvacXoteriQanak = 0;
global.xotakerArakan = 0;
global.xotakerIgakan = 0;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.random() * 100;
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

for (var y in matrix) {
    for (var x in matrix[y]) {
        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x * 1, y * 1, 1));
            cnvacXoteriQanak++;
        }
        else if (matrix[y][x] == 2) {
            var ser = (Math.round(Math.random())) / 2;
            xotakerArr.push(new Xotaker(x * 1, y * 1, 2 + ser, ser));
            matrix[y][x] += ser;
            if (ser == 0) xotakerArakan++;
            else xotakerIgakan++;
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

io.on("connection", function (socket) {

    setInterval(function () {

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
        io.sockets.emit("send grassArr", grassArr);
        io.sockets.emit("send xotakerArr", xotakerArr);
        io.sockets.emit("send gishatichArr", gishatichArr);
        io.sockets.emit("send mardArr", mardArr);
        io.sockets.emit("send mardakerArr", mardakerArr);
        io.sockets.emit("send matrix", matrix);

    }, 1000);
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
    "Grass_Born": cnvacXoteriQanak,
    "Xotaker_Arakan": xotakerArakan,
    "Xotaker_Igakan": xotakerIgakan,
    "Gishatich_Qanak": gishatichArr.length,
    "Mard_Qanak": mardArr.length,
    "Mardaker_Qanak": mardakerArr.length
}

setInterval(function () {
    statistics["Grass_Born"] = cnvacXoteriQanak;
    statistics["Xotaker_Arakan"] = xotakerArakan;
    statistics["Xotaker_Igakan"] = xotakerIgakan;
    statistics["Gishatich_Qanak"] = gishatichArr.length;
    statistics["Mard_Qanak"] = mardArr.length;
    statistics["Mardaker_Qanak"] = mardakerArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function (err) {
        if (err) throw err;
    })
}, 12000);




io.on('updated matrix', function (data) {
    matrix = data;
});
/*
io.on('sending updated grassArr', function (data) {
    grassArr = data;
});
io.on('sending updated xotakerArr', function (data) {
    xotakerArr = data;
});
io.on('sending updated gishatichArr', function (data) {
    gishatichArr = data;
});
io.on('sending updated mardArr', function (data) {
    mardArr = data;
});
io.on('sending updated mardakerArr', function (data) {
    mardakerArr = data;
})
*/

