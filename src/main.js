import { CONFIG } from './config.js';
import { getInput, setupInput } from './input.js';
import { getView, updateGame } from './game.js';

const canvas = document.querySelector('#game-canvas');
const context = canvas.getContext('2d');
let previousTimestamp = 0;

canvas.width = CONFIG.canvasWidth;
canvas.height = CONFIG.canvasHeight;

function drawStartScreen() {
  context.fillStyle = CONFIG.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = CONFIG.panelColor;
  context.fillRect(
    CONFIG.canvasInset,
    CONFIG.canvasInset,
    canvas.width - CONFIG.canvasInset * 2,
    canvas.height - CONFIG.canvasInset * 2
  );

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.fillStyle = CONFIG.accentColor;
  context.font = CONFIG.titleFont;
  context.fillText(CONFIG.title, canvas.width / 2, canvas.height * CONFIG.titleYRatio);

  context.fillStyle = CONFIG.textColor;
  context.font = CONFIG.promptFont;
  context.fillText(CONFIG.startPrompt, canvas.width / 2, canvas.height * CONFIG.promptYRatio);
}

function drawPlayingScreen(view) {
  context.fillStyle = CONFIG.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = CONFIG.textColor;
  context.font = CONFIG.hudFont;
  context.textAlign = 'left';
  context.textBaseline = 'top';
  context.fillText(`${CONFIG.scoreHudLabel}: ${view.score}`, CONFIG.hudPadding, CONFIG.hudY);
  context.textAlign = 'right';
  context.fillText(`${CONFIG.livesHudLabel}: ${view.lives}`, canvas.width - CONFIG.hudPadding, CONFIG.hudY);

  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = CONFIG.playerFont;
  context.fillText(CONFIG.playerEmoji, view.player.x, view.player.y);

  context.font = CONFIG.itemFont;
  for (const item of view.items) {
    const emoji = item.type === 'coffee' ? CONFIG.coffeeEmoji : CONFIG.bugEmoji;
    context.fillText(emoji, item.x, item.y);
  }
}

function drawGameOverScreen(view) {
  context.fillStyle = CONFIG.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = CONFIG.panelColor;
  context.fillRect(
    CONFIG.canvasInset,
    CONFIG.canvasInset,
    canvas.width - CONFIG.canvasInset * 2,
    canvas.height - CONFIG.canvasInset * 2
  );

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.fillStyle = CONFIG.accentColor;
  context.font = CONFIG.titleFont;
  context.fillText(CONFIG.gameOverTitle, canvas.width / 2, canvas.height * CONFIG.gameOverTitleYRatio);

  context.fillStyle = CONFIG.textColor;
  context.font = CONFIG.promptFont;
  context.fillText(`${CONFIG.scoreLabel}: ${view.score}`, canvas.width / 2, canvas.height * CONFIG.scoreYRatio);
  context.fillText(`${CONFIG.highScoreLabel}: ${view.highScore}`, canvas.width / 2, canvas.height * CONFIG.highScoreYRatio);
  context.fillText(CONFIG.restartPrompt, canvas.width / 2, canvas.height * CONFIG.restartPromptYRatio);
}

function render(view) {
  if (view.screen === CONFIG.screens.start) {
    drawStartScreen();
  } else if (view.screen === CONFIG.screens.playing) {
    drawPlayingScreen(view);
  } else if (view.screen === CONFIG.screens.gameOver) {
    drawGameOverScreen(view);
  }
}

function gameLoop(timestamp) {
  const elapsed = previousTimestamp === 0 ? 0 : (timestamp - previousTimestamp) / 1000;
  const deltaTime = Math.min(elapsed, CONFIG.maxDeltaTime);

  previousTimestamp = timestamp;
  updateGame(deltaTime, getInput());
  render(getView());
  requestAnimationFrame(gameLoop);
}

setupInput();
requestAnimationFrame(gameLoop);