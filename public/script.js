var socket = io(); 

var w = 30;
var h = 30;
var side = 24;
var exanak = "garun";
//socket.emit("send weather1", exanak);

 

socket.on("send weather", function(data){
    console.log(data);
    exanak = data;
});
function setup(){
    createCanvas(side * w, side * (h + 1.5));
    background("#acacac");
    frameRate(5);
    fill(0);
    textSize(24);
    text("Exanak:" + exanak, 10, 745);
}   

function draww() {
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
        text("GAME OVER",360 ,370);
    }
}
