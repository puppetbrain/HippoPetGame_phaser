/// <reference path="defs/phaser.d.ts" />

//initiate Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO)

game.state.add('BootState', BootState)
game.state.add('LoadState', LoadState)
game.state.add('TitleState', TitleState)
game.state.add('PlayState', PlayState)

game.state.start('BootState')