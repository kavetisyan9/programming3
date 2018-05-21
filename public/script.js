/*function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = random(100);
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
}*/


var socket = io();

var w = 30;
var h = 30;
var side = 24;
var grassArr = [], xotakerArr = [], gishatichArr = [], mardArr = [], mardakerArr = [];
var arrays = [grassArr,xotakerArr,gishatichArr,mardArr,mardakerArr];
var info = [w, h];

socket.emit("send info", info);

socket.on("send matrix", function(matrix) {
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
});

socket.emit("send arrays", arrays); 
function setup() {
    createCanvas(side * w, side * (h + 1.5));
    background("#acacac");
    frameRate(5);
}

//socket.emit("send weather", exanak);

/*function poxelExanak() {
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
setInterval(poxelExanak, 3000);*/


/*function draw() {
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
}*/
