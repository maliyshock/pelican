import { GameNode } from "@pelican/constants";

export function getAveragePosition(nodes: GameNode[]) {
  const calculations = nodes.reduce(
    (acc, item) => {
      const { position } = item;

      acc.sumX += position.x;
      acc.sumY += position.y;
      acc.amount++;

      return acc;
    },
    { sumX: 0, sumY: 0, amount: 0 },
  );

  const { sumX, sumY, amount } = calculations;

  return { x: Math.round(sumX / amount), y: Math.round(sumY / amount) };
}
