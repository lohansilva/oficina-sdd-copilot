import { CONFIG } from './config.js';

function createPlayer() {
  return {
    x: CONFIG.canvasWidth / 2,
    y: CONFIG.canvasHeight - CONFIG.playerBottomOffset
  };
}

function createGame() {
  return {
    screen: CONFIG.screens.start,
    player: createPlayer(),
    items: [],
    score: 0,
    lives: CONFIG.initialLives,
    highScore: loadHighScore(),
    elapsedTime: 0,
    spawnTimer: 0
  };
}

const gameState = createGame();

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(value, maximum));
}

function startGame() {
  gameState.screen = CONFIG.screens.playing;
  gameState.player = createPlayer();
  gameState.items = [];
  gameState.score = 0;
  gameState.lives = CONFIG.initialLives;
  gameState.elapsedTime = 0;
  gameState.spawnTimer = 0;
}

function loadHighScore() {
  const savedScore = Number.parseInt(localStorage.getItem(CONFIG.highScoreKey), 10);
  return Number.isFinite(savedScore) && savedScore >= 0 ? savedScore : 0;
}

function saveHighScore(score) {
  localStorage.setItem(CONFIG.highScoreKey, String(score));
}

function finishGame() {
  gameState.screen = CONFIG.screens.gameOver;

  if (gameState.score > gameState.highScore) {
    gameState.highScore = gameState.score;
    saveHighScore(gameState.highScore);
  }
}

function createItem() {
  const isCoffee = Math.random() < CONFIG.coffeeProbability;
  const minimumX = CONFIG.itemRadius;
  const maximumX = CONFIG.canvasWidth - CONFIG.itemRadius;

  return {
    type: isCoffee ? 'coffee' : 'bug',
    x: minimumX + Math.random() * (maximumX - minimumX),
    y: CONFIG.itemStartY
  };
}

function getSpawnInterval() {
  const intervalReduction = gameState.elapsedTime * CONFIG.spawnIntervalDecrease;
  return Math.max(CONFIG.minimumSpawnInterval, CONFIG.initialSpawnInterval - intervalReduction);
}

function getItemSpeed() {
  return CONFIG.itemBaseSpeed + gameState.elapsedTime * CONFIG.itemSpeedIncrease;
}

function spawnItems(deltaTime) {
  gameState.spawnTimer += deltaTime;
  const spawnInterval = getSpawnInterval();

  while (gameState.spawnTimer >= spawnInterval) {
    gameState.spawnTimer -= spawnInterval;
    gameState.items.push(createItem());
  }
}

function isColliding(item) {
  const horizontalDistance = item.x - gameState.player.x;
  const verticalDistance = item.y - gameState.player.y;
  const distance = Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2);
  return distance <= CONFIG.collisionDistance;
}

function resolveItem(item) {
  if (item.type === 'coffee') {
    gameState.score += 1;
  } else {
    gameState.lives = Math.max(0, gameState.lives - 1);
  }
}

function updatePlayer(deltaTime, input) {
  const direction = Number(input.right) - Number(input.left);
  const movement = direction * CONFIG.playerSpeed * deltaTime;
  const minimumX = CONFIG.playerHalfWidth;
  const maximumX = CONFIG.canvasWidth - CONFIG.playerHalfWidth;

  gameState.player.x = clamp(gameState.player.x + movement, minimumX, maximumX);
}

function updateItems(deltaTime) {
  const activeItems = [];
  const itemSpeed = getItemSpeed();

  for (const item of gameState.items) {
    item.y += itemSpeed * deltaTime;

    if (isColliding(item)) {
      resolveItem(item);
      if (gameState.lives === 0) {
        break;
      }
    } else if (item.y < CONFIG.floorY) {
      activeItems.push(item);
    }
  }

  gameState.items = activeItems;
}

export function updateGame(deltaTime, input) {
  if (gameState.screen === CONFIG.screens.start) {
    if (input.spacePressed) {
      startGame();
    }
    return;
  }

  if (gameState.screen === CONFIG.screens.gameOver) {
    if (input.spacePressed) {
      startGame();
    }
    return;
  }

  if (gameState.screen !== CONFIG.screens.playing) {
    return;
  }

  gameState.elapsedTime += deltaTime;
  updatePlayer(deltaTime, input);
  spawnItems(deltaTime);
  updateItems(deltaTime);

  if (gameState.lives === 0) {
    finishGame();
  }
}

export function getView() {
  return {
    screen: gameState.screen,
    player: { ...gameState.player },
    items: gameState.items.map((item) => ({ ...item })),
    score: gameState.score,
    lives: gameState.lives,
    highScore: gameState.highScore
  };
}