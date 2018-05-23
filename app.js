var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.redirect("public");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});


function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = random(100);
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

var matrix;
var w = 30;
var h = 30;
var side = 24;
var grassArr = [], xotakerArr = [], gishatichArr = [], mardArr = [], mardakerArr = [];

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
    io.sockets.emit("send weather", exanak);
}
setInterval(poxelExanak, 3000);

function setup() {
    matrix = genMatrix(w, h);
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
}

io.on('connection', function (socket) {
    //socket.on("send weather1",poxelExanak);
    // socket.emit("send weather",exanak);

});

