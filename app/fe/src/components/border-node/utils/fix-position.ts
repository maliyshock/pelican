import { Avoid } from "~/components/border-node";
import { Point } from "~/components/border-node/utils/generate-points.ts";
import { ExtendedSprite } from "~/components/border-node/utils/create-chunk.ts";

interface FixPosition {
  avoid: Avoid;
  point: Point;
  chunkSize: number;
  sprite: ExtendedSprite;
}
const OFFSET = 0.6;

export function fixPosition({ avoid, point, chunkSize, sprite }: FixPosition) {
  let { x: spriteX, y: spriteY } = point;
  const { originalWidth, originalHeight } = sprite;
  const maxX = chunkSize - originalWidth * OFFSET;
  const maxY = chunkSize - originalHeight * OFFSET;

  switch (avoid) {
    case "top":
      spriteY = Math.max(spriteY, originalHeight);
      break;
    case "bottom":
      spriteY = Math.min(spriteY, maxY);
      break;
    case "left":
      spriteX = Math.max(spriteX, originalWidth);
      break;
    case "right":
      spriteX = Math.min(spriteX, maxX);
      break;
  }

  return { spriteX, spriteY };
}
