var PlayState = {
  
  /* Properties
  ------------------------------
  */
  itemSprites: [
    {
      spriteImage: 'broccoliImage',
      health: -25
    },
    {
      spriteImage: 'hamImage',
      health: 50
    },
    {
      spriteImage: 'meatImage',
      health: 100
    },
    {
      spriteImage: 'chiliImage',
      health: -100
    }
  ],

  /* Create
  ------------------------------
  */
  create: function() {
    console.log('Play state')

    this.setupBackground()
    this.setupPlayer()
    this.setupToolItems()
  },

  /* Setup Background
  ------------------------------
  */
  setupBackground: function() {
    this.background = this.game.add.sprite(0, 0, 'background')
  },

  /* Setup Player
  ------------------------------
  */
  setupPlayer: function() {
    // write code to generate player sprite etc
  },

  /* Setup Tool Items
  ------------------------------
  */
  setupToolItems: function() {
    // for loop, that loops through itemSprites array
    for (var i = 0; i < this.itemSprites.length; i++) {

      // make group sprite

      // references
      var spriteImage = this.itemSprites[i].spriteImage
      var health = this.itemSprites[i].health

      // add sprite to state
      var item = this.game.add.sprite(i * 50 + 50, 550, spriteImage)
      item.scale.setTo(0.5)
      item.anchor.setTo(0.5)

      // make interactive
      this.enableInteractive(item, health)
    }
  },

  enableInteractive: function(passItemHere, passHealthHere) {
    console.log('make interactive')
    passItemHere.inputEnabled = true
    passItemHere.customProperties = {health: passHealthHere}
    passItemHere.events.onInputDown.add(this.handleToolTap, this)
  },

  handleToolTap: function() {
    console.log('handle tap')
  },

} // END OF CLASS