var LoadState = {
  //load game assets
  preload: function() {
    this.logoSprite = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logoImage')
    this.logoSprite.anchor.setTo(0.5)

    this.loaderSprite = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'loaderBarImage')
    this.loaderSprite.anchor.setTo(0.5)
    
    this.load.image('background', 'images/background.png')
    this.load.image('health', 'images/health.png')
    this.load.image('rotateBtn', 'images/button_rotate.png')
    this.load.image('broccoli', 'images/broccoli.png')
    this.load.image('ham', 'images/ham.png')
    this.load.image('chili', 'images/chili.png')
    this.load.image('meat', 'images/meat.png')
    this.load.spritesheet('hippoEat', 'images/hippo_eat_sprite.png', 181, 150, 5)
  },

  create: function() {
    // actually should go to title state
    this.state.start('TitleState')
  }
}