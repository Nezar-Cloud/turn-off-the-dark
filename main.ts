namespace SpriteKind {
    export const Monster = SpriteKind.create()
    export const FakeMonster = SpriteKind.create()
    export const NormalThing = SpriteKind.create()
}
function turnOnTheDark () {
    setTilemap()
    for (let value of sprites.allOfKind(SpriteKind.NormalThing)) {
        value.setImage(sprites.readDataImage(value, "nightImg"))
        value.follow(nezar, 15)
        value.setKind(SpriteKind.Monster)
    }
    darkIsOFF = false
}
function createAllMonsters () {
    for (let i = 0; i <= nightMonsterImgs.length - 1; i++) {
        for (let index = 0; index < 3; index++) {
            makedualityMonster(nightMonsterImgs[i], dayItemImgs[i])
        }
    }
}
// Set the tile map to show a dark room
function setTilemap () {
    tiles.loadMap(tiles.createMap(tilemap`level`))
    tiles.setTilemap(tilemap`level_0`)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (statusbar.value > 0) {
        nezar.setImage(nezarLightImg)
        turnOffTheDark()
    }
})
function makedualityMonster (night: Image, day: Image) {
    monster = sprites.create(night, SpriteKind.Monster)
    sprites.setDataImage(monster, "dayImg", day)
sprites.setDataImage(monster, "nightImg", night)
monster.setPosition(randint(50, 750), randint(0, 100))
    monster.follow(nezar, 15)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Monster, function (sprite, otherSprite) {
    game.reset()
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    nezar.setImage(nezarDarkImg)
    turnOnTheDark()
})
scene.onOverlapTile(SpriteKind.Player, myTiles.tile7, function (sprite, location) {
    game.over(true)
})
function turnOffTheDark () {
    redoTiles()
    for (let value2 of sprites.allOfKind(SpriteKind.Monster)) {
        value2.setImage(sprites.readDataImage(value2, "dayImg"))
        value2.follow(null, 0)
        value2.setKind(SpriteKind.NormalThing)
    }
    darkIsOFF = true
}
statusbars.onZero(StatusBarKind.Energy, function (status) {
    turnOnTheDark()
    nezar.setImage(nezarDarkImg)
})
function redoTiles () {
    tileImages = [
    myTiles.tile1,
    myTiles.tile2,
    myTiles.tile3,
    myTiles.tile4,
    myTiles.tile5,
    myTiles.tile6,
    myTiles.tile7
    ]
    for (let tileImage of tileImages) {
        copiedTile = tileImage.clone()
        copiedTile.replace(12, 13)
        copiedTile.replace(11, 1)
        copiedTile.replace(14, 4)
        tiles.coverAllTiles(tileImage, copiedTile)
    }
}
let copiedTile: Image = null
let tileImages: Image[] = []
let darkIsOFF = false
let nezar: Sprite = null
let nezarLightImg: Image = null
let nezarDarkImg: Image = null
let dayItemImgs: Image[] = []
let nightMonsterImgs: Image[] = []
let monster: Sprite = null
let vivianDarkImg = null
let vivianLightImg = null
let vivian = null
let statusbar: StatusBarSprite = null
nightMonsterImgs = [img`
    . . . . . . . . . . . . . . . . 
    . . . 8 8 8 8 8 8 8 . . . . . . 
    . . 8 8 8 8 8 8 8 8 8 8 8 . . . 
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . . 8 8 8 8 8 8 8 8 8 8 8 8 . . 
    . 8 8 f f 8 8 8 8 f f 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . 8 8 8 8 8 8 8 8 8 8 8 8 8 8 . 
    . . 8 8 8 8 8 8 8 8 8 8 8 8 c . 
    . . . 8 8 8 8 8 8 8 8 8 8 c c c 
    . . . . . 8 8 8 8 8 8 8 c c c c 
    . . . . . . . c c c c c c c c c 
    . . . . . . . . . c c c c c c c 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . e e e e e . . . . . 
    . . . . . e b b 6 6 b e . . . . 
    . . e e e b c c 6 6 6 c e . . . 
    . e b b c c c c c 6 6 6 c e . . 
    . e b c c c c c c c 6 6 c c e . 
    . e b c c c c c c c c c c c e . 
    . e c c c c e c c c c c c c e . 
    . e b c c e . e e c 6 c c c e . 
    . e b c c e . . . e 6 e 6 e . . 
    . e c c c c e . . . 6 . 6 . . . 
    . e b c c c e e . 6 . . 6 . . . 
    . . e c c c c b e e . 6 . . . . 
    . . e c c c c c c b e e . . . . 
    . e c c c c c c c c c b e e e . 
    e b c c c c c c c c c c c c b e 
    . e e e e e e e e e e e e e e . 
    `, img`
    e e . . . . . . . . . . . . . . 
    e e e e e e e e . . . . . . . . 
    . e e b b b b b b b b . . . . . 
    . e b b b b b b b b b b b . . . 
    . e b b b b b b b b b b b b . . 
    . e b b b b b b b b b b b b b . 
    e b b b f f b b b b b b b b b . 
    e b b f c c f b b b b b b . f . 
    e b b f c c f b b b . f . . . . 
    e b b b f f b b b . . . . . . . 
    e b b b b b b b b . . . . . . . 
    . e b b b b b b b . . . . . . . 
    . . e b b b b b b . f . . f . . 
    . . . e e b b b b b b b b b b . 
    . . . . . e e e b b b e e e e . 
    . . . . . . . . e e e e . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . f f f f . . . 
    . . . . . . . . f 6 6 6 6 f . . 
    . . . . . . . f c c 6 6 6 f . . 
    . . . . . . f c c c 6 6 f . . . 
    . . . . . . f c c c 6 6 f . . . 
    . . . . . . f c c 6 6 6 f . . . 
    . . . . . . f 6 6 6 c c f . . . 
    . . . . . . f 6 6 c c c f . . . 
    . . . . . . f 6 6 c c c f . . . 
    . . . . . . f 6 6 6 c c f . . . 
    . . . . . . f 6 6 6 6 6 f . . . 
    . . . . . f f f 6 6 6 6 f . . . 
    . . . . f 6 6 6 6 6 6 6 f . . . 
    . . . f b b 6 6 6 6 6 6 f . . . 
    . . f f f f f f f f f f f . . . 
    `, img`
    . . . . . . f f f . . . . . . . 
    . . . . f f f f f f . . . . . . 
    . . . . f f f f f f f . . . . . 
    . . . f f f f f f 6 f . . . . . 
    . . . f f 6 f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f f f f f . . . . 
    . . . f f f f f . f . f . . . . 
    . . . f . f f f . . f . . . . . 
    . . . . . f . f . f f . . . . . 
    . . . . . f . f . f . . . . . . 
    . . . . . f . . . . . . . . . . 
    `]
dayItemImgs = [img`
    . . . f f f f f f f f f f . . . 
    . . f 9 9 9 9 9 9 9 9 9 9 f . . 
    . f 9 9 1 1 1 1 1 1 1 1 9 9 f . 
    . . f 9 9 9 9 9 9 9 9 9 9 f . . 
    . . f 9 1 1 1 1 1 1 1 1 9 f . . 
    . . f 9 1 1 1 1 1 1 1 1 9 f . . 
    . . f 9 1 1 1 1 1 1 1 1 9 f . . 
    . . f 9 9 9 9 1 1 1 1 1 9 f . . 
    . . f 9 9 9 9 9 1 1 1 1 9 f . . 
    . . f 9 9 9 9 9 9 1 1 1 9 f . . 
    . . f 9 9 9 9 9 9 9 9 9 9 f . . 
    . . f 9 9 9 9 9 9 9 9 9 9 f . . 
    . . f 9 9 9 9 9 9 9 9 9 9 f . . 
    . . . f 9 9 9 9 9 9 9 9 f . . . 
    . . . f 9 9 9 9 9 9 9 9 f . . . 
    . . . . f f f f f f f f . . . . 
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . 3 3 3 3 3 3 . . . . . . . 
    . . 3 . 3 . 3 3 6 3 . . . . . . 
    . 3 . 3 . 3 3 6 6 3 . . . . . . 
    . . 3 . 3 . 3 6 6 3 . . . . . . 
    . 3 . 3 . 3 3 6 3 3 9 . . . . . 
    . . . 3 3 3 3 3 3 9 9 9 9 . . . 
    . . . . . . . . 9 9 9 9 9 9 . . 
    . . . . . . . . . . 9 9 9 . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    e . . . . . . . . . . . . . . . 
    c e . . . . . . . . . . . . . . 
    . c e . . . . . . . . . . . . . 
    . . c e . . . . . . . . . . . . 
    . . . c e . . . . . . . . . . . 
    . . . . c e . . . . . . . . . . 
    . . . . . c e . . . . . . . . . 
    . . . . . . c e . . . . . . . . 
    . . . . . . . c e . . . . . . . 
    . . . . . . . . c 5 5 5 . . . . 
    . . . . . . . . 4 5 5 5 e . . . 
    . . . . . . . . 4 5 5 e 5 5 . . 
    . . . . . . . . 4 e e 5 5 5 5 . 
    . . . . . . . . e 4 5 5 4 5 . . 
    . . . . . . . . . 4 5 5 5 . . . 
    . . . . . . . . . . 4 4 . . . . 
    `, img`
    . . . . . . . . . . . . b b . . 
    . . . . . . . . . . . b . . . . 
    . . . . . . . . . 2 2 b . . . . 
    . . . . . . . . 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . 2 2 2 2 b . . . . 
    . . . . . . . . 2 2 2 b . . . . 
    . . . . . b b b b d d b . . . . 
    . . . . 1 1 b b b b b f . . . . 
    . . . . f f f f f f f f . . . . 
    `, img`
    . . . . . . f f f . . . . . . . 
    . . . . f f 8 8 8 f . . . . . . 
    . . . . f 6 f 8 8 f f . . . . . 
    . . . f 6 6 6 f f 6 6 . . . . . 
    . . . f 1 1 1 6 6 1 1 f . . . . 
    . . . f 6 6 f 1 1 6 6 f . . . . 
    . . . f 1 1 f 6 6 f 1 f . . . . 
    . . . f 6 6 f 1 1 f 6 f . . . . 
    . . . f 1 1 f 6 6 f 1 f . . . . 
    . . . f 6 6 f 1 1 f 6 f . . . . 
    . . . f 1 1 f 6 6 f 1 f . . . . 
    . . . f 6 6 f f f f 6 f . . . . 
    . . . f 1 1 f . . f 1 f . . . . 
    . . . f 6 6 f . . f 6 f . . . . 
    . . . . f f . . . . f . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
nezarDarkImg = img`
    . . . f f f f f . . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f . . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f e e f f f . 
    f f e e f b f e e f f . . 
    . f e 4 e 1 f 4 4 f . . . 
    . f f f e 4 4 4 4 f . . . 
    . . f e e e e e f f . . . 
    . . e 4 4 c c c c f . . . 
    . . e 4 4 c c c c f . . . 
    . . f e e f 9 c c f . . . 
    . . . f f f f f f . . . . 
    . . . . f f f . . . . . . 
    `
nezarLightImg = img`
    . . . f f f f f . . . . . 
    . f f f f f f f f f . . . 
    . f f f f f f c f f f . . 
    f f f f c f f f c f f . . 
    f c f f c c f f f c c f f 
    f c c f f f f e f f f f f 
    f f f f f f f 4 e f f f . 
    f f e 4 f b f 4 4 f f . 5 
    . f 4 4 4 1 f 4 4 f . 5 . 
    . f f f 4 4 4 4 4 f 5 . 5 
    . . f e 4 4 4 b b 5 . 5 . 
    . . e 4 4 b b b 5 f 5 . . 
    . . e 4 4 b b b 5 f 5 . . 
    . . f e e f 6 b b f 5 . 5 
    . . . f f f f f f . . 5 . 
    . . . . f f f . . . 5 . 5 
    `
setTilemap()
nezar = sprites.create(nezarDarkImg, SpriteKind.Player)
controller.moveSprite(nezar)
scene.cameraFollowSprite(nezar)
tiles.placeOnTile(nezar, tiles.getTileLocation(0, 5))
createAllMonsters()
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(nezar)
game.onUpdateInterval(10, function () {
    if (darkIsOFF) {
        statusbar.value -= 1
    }
})
