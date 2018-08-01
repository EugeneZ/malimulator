export const Position = {
  OUTSIDE: 0,
  INSIDE: 1,
  BORDERING: 2,
};

interface PositionAndDimension {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function testZone(
  zone: PositionAndDimension,
  target: PositionAndDimension,
) {
  if (
    zone.x < target.x &&
    zone.x + zone.w > target.x + target.w &&
    zone.y < target.y &&
    zone.h + zone.y > target.y + target.h
  ) {
    return Position.INSIDE;
  } else if (
    zone.x < target.x + target.w &&
    zone.x + zone.w > target.x &&
    zone.y < target.y + target.h &&
    zone.h + zone.y > target.y
  ) {
    return Position.BORDERING;
  } else {
    return Position.OUTSIDE;
  }
}
