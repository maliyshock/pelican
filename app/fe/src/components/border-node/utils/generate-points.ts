export type Point = { x: number; y: number };

interface GeneratePoints {
  startX: number;
  startY: number;
  chunkSize: number;
  minDistance: number;
}

export function generatePoints({ startX, startY, chunkSize, minDistance }: GeneratePoints) {
  const grid: Point[] = [];
  const endX = startX + chunkSize;
  const endY = startY + chunkSize;

  for (let y = startY; y < endY; y += minDistance) {
    for (let x = startX; x < endX; x += minDistance) {
      grid.push({ x, y });
    }
  }

  return grid;
}
