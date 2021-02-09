import {
  BIRD_LIMIT,
  CLOUD_LIMIT,
  MODES,
  PIPE_LIMIT,
  SCREENS
} from "../constants";
import Cloud from "../entities/cloud";
import Pipe from "../entities/pipe";
import { canvas, context } from "../utils/canvas";
import { nextGeneration } from "../utils/ga";
import {
  gameState,
  isBirdDead,
  resetGameState,
  setBestScore
} from "../utils/game";
import { getRandomInteger } from "../utils/helper";

function drawBackground() {
  context.fillStyle = "#3cbcfc";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawClouds() {
  // Add new cloud if limit is not reached
  if (gameState.clouds.length < CLOUD_LIMIT) {
    const cloud = new Cloud();
    gameState.clouds.push(cloud);
  }
  for (let i = 0; i < gameState.clouds.length; i++) {
    // Draw and update x postion of clouds
    gameState.clouds[i].draw();
    gameState.clouds[i].update();
    // Remove cloud if it is not visible
    if (gameState.clouds[i].x < -50) {
      gameState.clouds.splice(i, 1);
    }
  }
}

function drawPipes() {
  // Add new pipe if limit is not reached
  if (gameState.pipes.length < PIPE_LIMIT) {
    let pipeX = undefined;
    // In order to maintain some distance between pipes
    if (gameState.pipes.length > 0) {
      pipeX =
        gameState.pipes[gameState.pipes.length - 1].x +
        getRandomInteger(200, 400);
    }
    const pipe = new Pipe({ x: pipeX });
    gameState.pipes.push(pipe);
  }
  for (let i = 0; i < gameState.pipes.length; i++) {
    // Draw and update x postion of pipes
    gameState.pipes[i].draw();
    gameState.pipes[i].update();
    // Remove pipe if it is not visible
    if (gameState.pipes[i].x < -50) {
      gameState.score += 1;
      gameState.pipes.splice(i, 1);
    }
  }
}

function drawPlayerBird() {
  gameState.playerBird.draw();
  gameState.playerBird.update();
  // If player bird has died then navigate to death screen
  if (isBirdDead(gameState.playerBird)) {
    gameState.activeScreen = SCREENS.DEATH;
    // If high-score is achieved then save the score
    if (gameState.score > gameState.bestScore) {
      setBestScore(gameState.score);
    }
  }
}

function drawBirds() {
  for (let i = 0; i < gameState.liveBirds.length; i++) {
    gameState.liveBirds[i].draw();
    gameState.liveBirds[i].think(gameState.pipes);
    gameState.liveBirds[i].update();

    // If bird has died then remove that bird from liveBirds add it to deadBirds list
    if (isBirdDead(gameState.liveBirds[i])) {
      gameState.deadBirds.push(...gameState.liveBirds.splice(i, 1));
    }

    // When all birds are dead create new population
    if (gameState.liveBirds.length === 0) {
      gameState.generation += 1;
      gameState.bestDistance = Math.max(
        ...gameState.deadBirds.map((bird) => bird.distance),
        gameState.bestDistance
      );
      gameState.liveBirds = nextGeneration(gameState.deadBirds);
      gameState.deadBirds = [];
      resetGameState();
    }
  }
}

function drawPauseButton() {
  context.font = "14px PressStart2P";
  context.fillStyle = "#f7dc6f";
  context.fillText("PAUSE", 420, 10);
}

function drawScoreText() {
  context.font = "14px PressStart2P";
  context.fillStyle = "white";
  context.fillText(`SCORE:${gameState.score}`, 10, 10);
}

function drawTraingText() {
  context.font = "14px PressStart2P";
  context.fillStyle = "white";
  context.fillText(`BEST-DISTANCE:${gameState.bestDistance}`, 10, 26);
  context.fillText(`GENERATION:${gameState.generation}`, 10, 42);
  context.fillText(`ALIVE:${gameState.liveBirds.length}/${BIRD_LIMIT}`, 10, 58);
}

function drawGameScreen() {
  drawBackground();
  drawClouds();
  drawPipes();
  drawScoreText();
  drawPauseButton();
  if (gameState.mode === MODES.STANDARD) {
    drawPlayerBird();
  } else {
    drawTraingText();
    drawBirds();
  }
}

export default drawGameScreen;
