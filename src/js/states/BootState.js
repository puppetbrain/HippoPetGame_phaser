var BootState = {
   // initiate game settings
  init: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true
  },

  preload: function() {
    this.load.image('loaderBarImage', 'images/preloader.png')
    this.load.image('logoImage', 'images/logo.png')
  },

  create: function() {
    this.game.stage.backgroundColor = '#FF4C99'
    this.state.start('LoadState')
  }
}