const [KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT] = [38, 40, 37, 39];

class Snake {
  constructor(x = 0, y = 0) {
    this.pos = [x, y];
    this.speed = [0, 0];
    this.toNextSpace = 0;
    this.nextSpaceReq = 10;
    this.tail = []; // an array of positions
    this.movementQueue = []; // an array of queued inputs
    window.addEventListener('keydown', this.onKeyPress.bind(this))
  }

  onKeyPress({keyCode}) {
    switch(keyCode) {
      case KEY_UP:
        this.updateDirection(0, -1); break;
      case KEY_DOWN:
        this.updateDirection(0, 1); break;
      case KEY_LEFT:
        this.updateDirection(-1, 0); break;
      case KEY_RIGHT:
        this.updateDirection(1, 0); break;
      default:
        console.log('key unrecognized')
        this.updateDirection(0, 0);
    }
  }

  checkIfOutOfBounds(x, y) {
    if (
      x > WIDTH - 1
      || y > HEIGHT - 1
      || x < 0
      || y < 0
    ) {
      GAME_OVER = true;
    }
  }
  
  checkIfInTail(x, y) {
    for (let i = 0; i < this.tail.length - 1; i++) {
      const [tailX, tailY] = this.tail[i];
      const [snakeX, snakeY] = this.pos;
      if (tailX == snakeX && tailY == snakeY) {
        GAME_OVER = true;
      }
    }
  }

  eat() {
    const lastTail = this.tail[this.tail.legnth - 1] || this.pos;
    this.tail.push([...lastTail, true]);
    if (this.nextSpaceReq > 5) {
      this.nextSpaceReq -= this.tail.length % 5 === 0;
    }
    if (this.nextSpaceReq <= 5) {
      this.nextSpaceReq -= this.tail.length % 10 === 0;
    }
  }

  updatePos(x = this.pos[0], y = this.pos[1], force) {
    const [xSpeed, ySpeed] = this.speed;
    if (this.toNextSpace >= this.nextSpaceReq || force) {
      this.checkIfOutOfBounds(x + xSpeed, y + ySpeed);
      this.checkIfInTail(x + xSpeed, y + ySpeed);
      this.pos = [
        Math.max(0, Math.min((x + xSpeed), WIDTH - 1)), 
        Math.max(0, Math.min((y + ySpeed), HEIGHT - 1)),
      ];
      this.toNextSpace = 0;
      if (this.tail.length) {
        this.tail.shift()
        this.tail.push([x, y])
      }
      if (this.movementQueue.length) {
        this.updateDirection(...this.movementQueue.shift());
      }
    }
    if (isSamePos(this.pos, food.pos)) {
      this.eat();
      if (this.tail.length < (HEIGHT * WIDTH) - 1) {
        food.updatePos(this);
      }
    }
    this.toNextSpace++;
  }

  updateDirection(speedX, speedY) {
    const [prevX, prevY] = this.pos;
    const [tailX, tailY] = this.tail[this.tail.length - 1] || [-1, -1];
    if (tailX == prevX + speedX && tailY == prevY + speedY) {
      this.movementQueue.push([speedX, speedY]);
    } else {
      this.speed = [speedX, speedY];
    }
  }

  draw(ctx) {
    ctx.fillStyle = GAME_OVER ? COLOR_1 : COLOR_3;
    ctx.fillRect(this.pos[0] * 8 + 1, this.pos[1] * 8 + 1, 6, 6)
    for (let i = 0; i < this.tail.length; i++) {
      const [tailX, tailY, isFood] = this.tail[i];
      isFood
        ? ctx.fillRect(tailX * 8, tailY * 8, 8, 8)
        : ctx.fillRect(tailX * 8 + 1, tailY * 8 + 1, 6, 6)
    }
    if (!GAME_OVER) {
      this.updatePos();
      // auto play (w/ diagonals?)
      // this.speed = [
      //   Math.min(Math.max(-1, food.pos[0] - this.pos[0]), 1),
      //   Math.min(Math.max(-1, food.pos[1] - this.pos[1]), 1)
      // ]
    }
  }
}