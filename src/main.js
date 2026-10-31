import { CONFIG } from './config.js';

const canvas = document.querySelector('#game-canvas');
const context = canvas.getContext('2d');
const gameState = {
  screen: CONFIG.screens.start
};
let previousTimestamp = 0;

canvas.width = CONFIG.canvasWidth;
canvas.height = CONFIG.canvasHeight;

function drawStartScreen() {
  context.fillStyle = CONFIG.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = CONFIG.panelColor;
  context.fillRect(1, 1, canvas.width - 2, canvas.height - 2);

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.fillStyle = CONFIG.accentColor;
  context.font = CONFIG.titleFont;
  context.fillText(CONFIG.title, canvas.width / 2, canvas.height * CONFIG.titleYRatio);

  context.fillStyle = CONFIG.textColor;
  context.font = CONFIG.promptFont;
  context.fillText(CONFIG.startPrompt, canvas.width / 2, canvas.height * CONFIG.promptYRatio);
}

function render() {
  if (gameState.screen === CONFIG.screens.start) {
    drawStartScreen();
  }
}

function gameLoop(timestamp) {
  const elapsed = previousTimestamp === 0 ? 0 : (timestamp - previousTimestamp) / 1000;
  const deltaTime = Math.min(elapsed, CONFIG.maxDeltaTime);

  previousTimestamp = timestamp;
  render(deltaTime);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);