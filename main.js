
const WIDTH = 160 / 8;
const HEIGHT = 144 / 8;
let GAME_OVER = false;

const COLOR_1 = '#331e50';
const COLOR_2 = '#a63725';
const COLOR_3 = '#d68e49';
const COLOR_4 = '#f7e7c6';

const snake = new Snake();
const food = new Food(snake);

function isSamePos(tupleA, tupleB) {
  return tupleA[0] == tupleB[0] && tupleA[1] == tupleB[1];
}

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.draw(ctx);
  food.draw(ctx);
  window.requestAnimationFrame(draw);
}

init();