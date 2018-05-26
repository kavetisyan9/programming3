var Character = require('./class.character.js');

module.exports = class Mard extends Character {
    constructor(x, y, index, ser) {
        super(x, y, index);
        this.energy = Math.round(Math.random() * 16);
        this.speed = 32;
        this.multiply = Math.round(Math.random() * 16);
        this.ser = (ser == 0 ? "arakan" : "igakan");
    }

    yntrelVandak(ch) {
        this.stanalNorKordinatner();
        return super.yntrelVandak(ch);
    }

    stanalNorKordinatner() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    sharjvel() {
        var vand = this.random(this.yntrelVandak(0));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy--;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 4;
        }
    }

    utelXotaker() {
        this.energy--;
        var vand = this.random(this.yntrelVandak(2));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy += this.speed / 2;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 4;
            for (var i in xotakerArr) {
                if (xotakerArr[i].x == this.x && xotakerArr[i].y == this.y) {
                    xotakerArr.splice(i, 1);
                }
            }
        }
        else this.sharjvel();
    }

    utelXot() {
        this.energy--;
        this.multiply++;
        var vand = this.random(this.yntrelVandak(1));
        if (vand && this.multiply >= this.speed / 2) {
            this.energy += this.speed;
            matrix[this.y][this.x] = 0;
            this.x = vand[0]; this.y = vand[1];
            matrix[this.y][this.x] = 4;
            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                }
            }
        }
        else this.sharjvel();
    }

    bazmanal() {
        if (this.ser == "arakan") {
            var vandak = this.random(this.yntrelVandak(4.5));
        }
        else if (this.ser == "igakan") {
            var vandak = this.random(this.yntrelVandak(4));
        }
        if (vandak) {
            var vand = this.random(this.yntrelVandak(0));
        }
        var vand = this.random(this.yntrelVandak(0));
        if (vand && this.energy >= this.speed) {
            this.energy = 1;
            var newmard = new Mard(vand[0], vand[1], 4);
            mardArr.push(newmard);
        }
    }

    mahanal() {
        if (this.energy <= -(this.speed / 2)) {
            matrix[this.y][this.x] = 0;
            for (var i in mardArr) {
                if (mardArr[i].x == this.x && mardArr[i].y == this.y) {
                    mardArr.splice(i, 1);
                }
            }
        }
    }
}