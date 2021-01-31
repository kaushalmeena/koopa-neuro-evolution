import { CLOUD_SPEED } from "../constants";
import { canvas, context } from "../utils/canvas";
import { getRandomInteger } from "../utils/helper";
import { cloudSprites } from "../utils/sprites";

class Cloud {
  constructor({ x, y, type } = {}) {
    this.x = x || canvas.width + getRandomInteger(10, 500);
    this.y = y || getRandomInteger(30, canvas.height - 30);
    this.type = type || `cloud-${getRandomInteger(1, 3)}`;
  }

  draw() {
    context.drawImage(cloudSprites[this.type], this.x, this.y);
  }

  update() {
    this.x -= CLOUD_SPEED;
  }
}

export default Cloud;
