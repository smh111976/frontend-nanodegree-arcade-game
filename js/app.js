// global variables
const canvasTop = 50;
const canvasBottom = 600;
const canvasLeft = 0;
const canvasRight = 505;
const laneYcoords = [134, 217, 300];
let score = 0;
let justScored = false;


// Enemies our player must avoid
class Enemy {
  constructor(spriteImg, xPos, yPos) {
    // The image/sprite for our enemies
    this.sprite = spriteImg;
    // x starting position
    this.xStart = xPos;
    // x position of character
    this.x = this.xStart;
    // y position of character
    this.y = yPos;
    // character height
    this.height = 80;
    // character width
    this.width = 100;
    // character speed
    this.speed = 0;
    // various enemy speeds
    this.speeds = [233, 266, 300, 333, 366, 400, 433, 466, 500, 533];
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x === this.xStart) {
      this.y = this.chooseLane(laneYcoords);
      this.speed = (this.speeds[Math.floor(Math.random() * this.speeds.length)]) * dt;
    }
    if(this.x < canvasRight) {
      this.x += this.speed;
    } else {
      this.x = this.xStart;
    }
  }
  // choose one of three lanes for the enemy to travel across
  chooseLane(laneYcoords) {
    return laneYcoords[Math.floor(Math.random() * laneYcoords.length)];
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
    // x starting position
    this.xStart = xPos;
    // x position
    this.x = this.xStart;
    // y starting position
    this.yStart = yPos;
    // y position of character
    this.y = this.yStart;
    // character height
    this.height = 80;
    // character width
    this.width = 70;
    // if true, user requests to go up
    this.moveUp = false;
    // if true, user requests to go right
    this.moveRight = false;
    // if true, user requests to go down
    this.moveDown = false;
    // if true, user requests to go left
    this.moveLeft = false;
    // distance player can jump side to side on single xPosJump
    this.xJump = 101;
    // distance player can jump up and down on a single jump
    this.yJump = 83;
  }

  update() {
    // if 'up' arrow was pressed
    if(this.moveUp) {
      if(this.y - this.yJump >= canvasTop) {
        this.y -= this.yJump;
      }
      if(this.y === canvasTop) {
        score++;
        console.log("YOU SCORED!!!");
        // this.y = this.yStart;
      }
      this.moveUp = false;
    }
    // if 'right' arrow was pressed
    if(this.moveRight) {
      if(this.x + this.xJump + this.width <= canvasRight) {
        this.x += this.xJump;
      }
      this.moveRight = false;
    }
    // if 'down' arrow was pressed
    if(this.moveDown) {
      if(this.y + this.yJump + this.height <= canvasBottom) {
        this.y += this.yJump;
      }
      this.moveDown = false;
    }
    // if 'left' arrow was pressed
    if(this.moveLeft) {
      if(this.x - this.xJump >= canvasLeft) {
        this.x -= this.xJump;
      }
      this.moveLeft = false;
    }
    // if a collision is detected
    if(this.detectCollision(allEnemies)) {
      this.x = this.xStart;
      this.y = this.yStart;
      if(score > 0) {
        score--;
      }
    }


  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // method used to detect collisions with enemy bugs
  detectCollision(enemies) {
    let collision = false;
    for(let enemy of enemies) {
      if(this.x < enemy.x + enemy.width && this.x + this.width > enemy.x &&
         this.y < enemy.y + enemy.height && this.y + this.height > enemy.y) {
        collision = true;
      }
    }
    return collision;
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
  new Enemy('images/enemy-bug2.png', -150, 134),
  new Enemy('images/enemy-bug2.png', -150, 217),
  new Enemy('images/enemy-bug2.png', -150, 300)
];

// Place the player object in a variable called player
// const player = new Player('images/char-boy.png', 202, 380);
const player = new Player('images/char-boy2.png', 218, 465);



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
