var GameState = {

  myName: 'Bummy', 

  //initiate game settings
  init: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
  },

  //load game assets
  preload: function() {
    this.load.image('background', 'images/background.png')
    // this.load.image('hippo', 'images/hippo.png');
    this.load.image('rotateBtn', 'images/button_rotate.png')
    this.load.image('broccoli', 'images/broccoli.png')
    this.load.image('meat', 'images/meat.png')
    this.load.spritesheet('hippo', 'images/hippo_sprite.png', 195, 150, 4)
  },

  //execute everything
  create: function() {
    this.background = this.game.add.sprite(0,0, 'background')
    this.broccoli = this.game.add.sprite(50,550, 'broccoli')
    this.broccoli.anchor.setTo(0.5)
    this.meat = this.game.add.sprite(150,550, 'meat')
    this.meat.anchor.setTo(0.5)
    this.hippo = this.game.add.sprite(200, 450, 'hippo')
    this.hippo.anchor.setTo(0.5)
    this.rotateBtn = this.game.add.sprite(250, 550, 'rotateBtn')
    this.rotateBtn.anchor.setTo(0.5)

    // NEW EAT FUNCTION

    //


    //

    //

  //

    console.log(`My name is ${this.myName}`)

    //hippo properties
    this.hippo.customProperties = {health: 100, fun: 100}

    //make interactive
    this.hippo.inputEnabled = true
    this.hippo.input.enableDrag()
    this.hippo.events.onDragStart.add(this.handleDragStart)
    this.hippo.events.onDragStop.add(this.handleDragStop)

    this.broccoli.inputEnabled = true
    this.broccoli.customProperties = {health: -20}
    this.broccoli.events.onInputDown.add(this.pickItem, this)
    
    this.meat.inputEnabled = true
    this.meat.customProperties = {health: 100}
    this.meat.events.onInputDown.add(this.pickItem, this)

    this.rotateBtn.inputEnabled = true
    this.rotateBtn.events.onInputDown.add(this.rotateHippo, this)
    
    this.background.inputEnabled = true
    this.background.events.onInputDown.add(this.placeItem, this)

    this.buttons = [this.broccoli, this.meat, this.rotateBtn]

    //if nothing selected
    this.selectedItem = null
    this.uiBlocked = false
  },

  pickItem: function(sprite, event) {
    if(!this.uiBlocked) {
    console.log('pick item')
    this.clearSelection()
    sprite.alpha = 0.4
    this.selectedItem = sprite
    }
   },

  rotateHippo: function(sprite, event) {
    if(!this.uiBlocked) {
   
    // UI blocked until animation ends
    this.uiBlocked = true
    this.clearSelection()
    //item selected indication
    sprite.alpha = 0.4

    var hippoRotation = this.game.add.tween(this.hippo)
    hippoRotation.to({angle: '720'}, 1000)
    hippoRotation.onComplete.add (function() {
      this.uiBlocked = false
      sprite.alpha = 1
      this.hippo.customProperties.fun -= 10 
      console.log(this.hippo.customProperties.fun)
    }, this)
    hippoRotation.start()
    }
    
  },
  clearSelection: function() {
    this.buttons.forEach(function(element, index) {
      element.alpha = 1
    })
    //nothing selected
    this.selectedItem = null
},

placeItem: function(sprite, event) {
  if(this.selectedItem && !this.uiBlocked) {
    var x = event.position.x
    var y = event.position.y

    var newItem = this.game.add.sprite(x, y, this.selectedItem.key)
    newItem.anchor.setTo(0.5)
    newItem.customProperties = this.selectedItem.customProperties

   this.uiBlocked = true

   var hippoMovement = this.game.add.tween(this.hippo)
   var toX = x - this.hippo.width / 2
   game.world.bringToTop(this.hippo)
   hippoMovement.to({x: toX, angle: '+360', y:y}, 700)
   hippoMovement.onComplete.add(function() { 
     this.uiBlocked = false
   }, this)
   hippoMovement.start()
  }
  },
  
  handleDragStart: function(sprite) {
    console.log('drag start')
    console.log(sprite)
    sprite.scale.x = 1.2
    sprite.scale.y = 1.2
  },
  handleDragStop: function(sprite) {
    console.log('drag stop')
    sprite.scale.x = 1
    sprite.scale.y = 1
  }

};


//initiate Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO)

game.state.add('GameState', GameState)
game.state.start('GameState')
