// Returns random integer between min and max (inclusive)
export const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Checks if point lies inside rectangle
export const isPointInside = (pX, pY, rectX, rectY, rectW, rectH) =>
  pX > rectX && pX < rectX + rectW && pY > rectY && pY < rectY + rectH;

// Checks if two rectangle overlap each other
export const isRectangleOverlapping = (
  rect1X,
  rect1Y,
  rect1W,
  rect1H,
  rect2X,
  rect2Y,
  rect2W,
  rect2H
) =>
  !(
    rect1X + rect1W < rect2X ||
    rect2X + rect2W < rect1X ||
    rect1Y + rect1H < rect2Y ||
    rect2Y + rect2H < rect1Y
  );
