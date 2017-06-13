var PlayState = {

  sprites = [
    'broccoli',
    'ham',
    'meat',
    'chili'
  ],

  //execute everything
  create: function() {
    this.background = this.game.add.sprite(0,0, 'background')
    this.health = this.game.add.sprite(120, 10, 'health')
    this.broccoli = this.game.add.sprite(50,550, 'broccoli')
    this.broccoli.anchor.setTo(0.5)
    this.ham = this.game.add.sprite(135,550, 'ham')
    this.ham.anchor.setTo(0.5)
    this.meat = this.game.add.sprite(195,550, 'meat')
    this.meat.anchor.setTo(0.5)
    this.chili = this.game.add.sprite(300,550, 'chili')
    this.chili.anchor.setTo(0.5)
    this.hippo = this.game.add.sprite(200, 450, 'hippoEat')
    this.hippo.anchor.setTo(0.5)
    this.rotateBtn = this.game.add.sprite(350, 550, 'rotateBtn')
    this.rotateBtn.anchor.setTo(0.5)

    //spritesheet animation
    this.hippo.animations.add('hippoEat',[0, 1, 2, 3], 12, false)

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

    var style = {
      font: '20px Arial',
      fill: 'white'
    }
    this.game.add.text(10, 20, 'Health:', style)
    this.game.add.text(10, 100, 'Fun:', style)

    this.healthText = this.game.add.text(80, 20, '', style)
    this.funText = this.game.add.text(80, 100, '', style)

    this.refreshStats()

    //decrease health every 5 seconds
    this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this)
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
     
     //update visuals for the stats
     this.refreshStats()
     
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
     
     newItem.destroy() 

     //play eat animation
     this.hippo.animations.play('hippoEat')

     this.uiBlocked = false

     var stat;
     for(stat in newItem.customProperties) {
       if(newItem.customProperties.hasOwnProperty(stat)) {
          console.log(stat)
         this.hippo.customProperties[stat] += newItem.customProperties[stat]
       }
     }

     //update visuals for the stats
     this.refreshStats()

   }, this)
   hippoMovement.start()
    }
  },
  refreshStats: function() {
    this.healthText.text = this.hippo.customProperties.health
    this.funText.text = this.hippo.customProperties.fun
  },
  reduceProperties: function() {
    this.hippo.customProperties.health -= 10
    this.refreshStats()
  },

  update: function() {
    if(this.hippo.customProperties.health <= 0 || this.hippo.customProperties.fun <= 0) {
      this.hippo.frame = 4
      this.uiBlocked = true

      this.game.time.events.add(2000, this.gameOver, this)
      }
    },
  gameOver: function()  {
    this.game.state.restart()
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
