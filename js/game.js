var SPEED = 50;
var SPRITESIZE = 16;

function generateSprites() {
    var sprites = {
        player: new Image(),
        enemy: new Image(),
        wall: new Image(),
        ground: new Image()
    };
    sprites.ground.src = "assets/dirtdarker.png";
    sprites.wall.src = "assets/dirtdark.png";
    sprites.player.src = "assets/character.png";
    sprites.enemy.src = "assets/character2.png";
    return sprites;
}

function generateLevel() {
    var level = [];
    for (var x = 0; x < 20; x++) {
        level[x] = [];
        for (var y = 0; y < 20; y++) {
            level[x][y] = x == 0 || y == 0 || x == 19 || y == 19 ? 1 : 0;
        }
    }
    return level;
}

var KEYS = {
    W: 87,
    S: 83,
    A: 65,
    D: 68
};

var controls = {
    mouseX: 0,
    mouseY: 0,
    _pressed: {},
    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },
    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },
    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};

function canMove(x,y) {
    var tx = Math.round(player.x / SPRITESIZE);
    var ty = Math.round(player.y / SPRITESIZE);
    if (tx + x >= 0 && ty + y >= 0) {
        return level[tx+x][ty+y] == 0;
    }
}

function update(diff) {
    var speed = SPEED; // px/sec
    if (controls.isDown(KEYS.W) && canMove(0,-1)) player.y -= speed * diff;
    if (controls.isDown(KEYS.S) && canMove(0,1)) player.y += speed * diff;
    if (controls.isDown(KEYS.A) && canMove(-1,0)) player.x -= speed * diff;
    if (controls.isDown(KEYS.D) && canMove(1,0)) player.x += speed * diff;
}

function drawLevel(canvas, level, w, h) {
    for (var tx=0;tx < 20;tx++) {
        for (var ty = 0; ty < 20; ty++) {
            var sprite = level[tx][ty] == 0 ? sprites.ground : sprites.wall;
            canvas.drawImage(sprite, tx * SPRITESIZE, ty * SPRITESIZE, 16, 16);
        }
    }
}

function draw(canvas, w, h) {
    canvas.globalCompositeOperation = "source-over";
    canvas.clearRect(0, 0, w, h);
    drawLevel(canvas, level, w, h);

    var dx = controls.mouseX - player.x;
    var dy = controls.mouseY - player.y;
    var angle = Math.atan2(dy, dx);

    var pl =  rotateImage(sprites.player, angle);
    canvas.drawImage(pl, player.x, player.y, 16, 16);
}