class Food {
  constructor(snake) {
    this.pos = [0, 0];
    this.updatePos(snake);
  }

  updatePos(snake) {
    this.pos = [
      Math.floor(Math.random() * WIDTH), 
      Math.floor(Math.random() * HEIGHT)
    ];
    if (snake.tail.some(isSamePos.bind(null, this.pos))) {
      console.log('food in tail')
      this.updatePos(snake);
    }
  }

  draw(ctx) {
    ctx.fillStyle = COLOR_2;
    ctx.fillRect(this.pos[0] * 8 + 2, this.pos[1] * 8 + 2, 4, 4)
  }
}