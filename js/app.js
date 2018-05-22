// Enemies our player must avoid
class Enemy {
  constructor(spriteImg, xPos, yPos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = spriteImg;
    // x position of image
    this.x = xPos;
    // y position of image
    this.y = yPos;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
  }
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(spriteImg, xPos, yPos) {
    this.sprite = spriteImg;
    // x position of image
    this.x = xPos;
    // y position of image
    this.y = yPos;
    // if true, user requests to go up
    this.moveUp = false;
    // if true, user requests to go right
    this.moveRight = false;
    // if true, user requests to go down
    this.moveDown = false;
    // if true, user requests to go left
    this.moveLeft = false;
  }

  update() {
    let potentialXpos, potentialYpos, xPosJump = 101, yPosJump = 83,
        minYpos = -35, maxYpos = 380, minXpos = 0, maxXpos = 404;
    if(this.moveUp) {
      console.log(`y pos. before move: ${this.y}`);
      potentialYpos = this.y - yPosJump;
      if(potentialYpos >= minYpos) {
        this.y = potentialYpos;
      }
      console.log(`y pos. after move: ${this.y}`);
      this.moveUp = false;
    }
    if(this.moveRight) {
      console.log(`x pos. before move: ${this.x}`);
      potentialXpos = this.x + xPosJump;
      if(potentialXpos <= maxXpos) {
        this.x = potentialXpos;
      }
      console.log(`x pos. after move: ${this.x}`);
      this.moveRight = false;
    }
    if(this.moveDown) {
      console.log(`y pos. before move: ${this.y}`);
      potentialYpos = this.y + yPosJump;
      if(potentialYpos <= maxYpos) {
        this.y = potentialYpos;
      }
      console.log(`y pos. after move: ${this.y}`);
      this.moveDown = false;
    }
    if(this.moveLeft) {
      console.log(`x pos. before move: ${this.x}`);
      potentialXpos = this.x - xPosJump;
      if(potentialXpos >= minXpos) {
        this.x = potentialXpos;
      }
      console.log(`x pos. after move: ${this.x}`);
      this.moveLeft = false;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    if(key !== undefined) {
      switch(key) {
        case 'left':
        this.moveLeft = true;
        break;
        case 'up':
        this.moveUp = true;
        break;
        case 'right':
        this.moveRight = true;
        break;
        case 'down':
        this.moveDown = true;
      }
    }
  }
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
  new Player('images/enemy-bug.png', 0, 62),
  new Player('images/enemy-bug.png', 0, 145),
  new Player('images/enemy-bug.png', 0, 228)
];

// Place the player object in a variable called player
const player = new Player('images/char-boy.png', 202, 380);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
