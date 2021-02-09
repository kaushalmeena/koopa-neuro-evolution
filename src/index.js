import { ACTIONS, SCREENS } from "./constants";
import drawDeathScreen from "./screens/death";
import drawGameScreen from "./screens/game";
import drawMainScreen from "./screens/main";
import drawPauseScreen from "./screens/pause";
import { canvas } from "./utils/canvas";
import { gameState, performAction } from "./utils/game";
import { isPointInside } from "./utils/helper";

import "./index.css";

function setup() {
  // Attach keyboard listner for spacebar key
  document.body.onkeyup = function (e) {
    switch (gameState.activeScreen) {
      case SCREENS.GAME:
        if (e.code == "Space") {
          return performAction(ACTIONS.FLAP_WING);
        }
        if (e.code == "Escape") {
          return performAction(ACTIONS.PAUSE_GAME);
        }
        break;
    }
  };
  // Attach click listners for various screens
  canvas.onclick = function (e) {
    const x = (e.offsetX / canvas.offsetWidth) * canvas.width;
    const y = (e.offsetY / canvas.offsetHeight) * canvas.height;
    switch (gameState.activeScreen) {
      case SCREENS.MAIN:
        // When 'MODE' is clicked
        if (isPointInside(x, y, 132, 230, 224, 36)) {
          return performAction(ACTIONS.TOOGLE_MODE);
        }
        // When 'START' is clicked
        if (isPointInside(x, y, 190, 300, 120, 24)) {
          return performAction(ACTIONS.START_GAME);
        }
        break;
      case SCREENS.GAME:
        // When 'PAUSE' is clicked
        if (isPointInside(x, y, 420, 10, 80, 14)) {
          return performAction(ACTIONS.PAUSE_GAME);
        }
        performAction(ACTIONS.FLAP_WING);
        break;
      case SCREENS.DEATH:
        // When 'RESTART' is clicked
        if (isPointInside(x, y, 166, 250, 168, 24)) {
          return performAction(ACTIONS.RESTART_GAME);
        }
        // When 'QUIT' is clicked
        if (isPointInside(x, y, 202, 290, 96, 24)) {
          return performAction(ACTIONS.QUIT_GAME);
        }
        break;
      case SCREENS.PAUSE:
        // When 'RESUME' is clicked
        if (isPointInside(x, y, 178, 180, 144, 24)) {
          return performAction(ACTIONS.RESUME_GAME);
        }
        // When 'SAVE STATE' is clicked
        if (isPointInside(x, y, 130, 220, 240, 24)) {
          return performAction(ACTIONS.SAVE_STATE);
        }
        // When 'LOAD STATE' is clicked
        if (isPointInside(x, y, 130, 260, 240, 24)) {
          return performAction(ACTIONS.LOAD_STATE);
        }
        // When 'QUIT' is clicked
        if (isPointInside(x, y, 202, 296, 96, 24)) {
          return performAction(ACTIONS.QUIT_GAME);
        }
        break;
    }
  };
}

function draw() {
  switch (gameState.activeScreen) {
    case SCREENS.MAIN:
      drawMainScreen();
      break;
    case SCREENS.GAME:
      drawGameScreen();
      break;
    case SCREENS.PAUSE:
      drawPauseScreen();
      break;
    case SCREENS.DEATH:
      drawDeathScreen();
      break;
  }
  requestAnimationFrame(draw);
}

setup();
draw();
