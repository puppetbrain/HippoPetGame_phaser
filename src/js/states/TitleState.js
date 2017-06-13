var TitleState = {
  create: function(){
    var background = this.game.add.sprite(0,0, 'background')
    background.inputEnabled = true

    background.events.onInputDown.add(function(){
      this.state.start('PlayState')
    }, this)
  }
}