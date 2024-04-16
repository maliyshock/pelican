import { GameNode, GameObject } from "~/types";
import { getRandom } from "~/utils/get-random.ts";
import { APPEARANCE_RANGE } from "~/constants/constants.tsx";
import { getBool } from "~/utils/get-bool.ts";

interface CreateNode {
  center: {
    x: number;
    y: number;
  };
  data: GameObject;
}

export function createNode({ center: { x, y }, data }: CreateNode): GameNode {
  const rangeX = getRandom(APPEARANCE_RANGE) * (getBool() ? 1 : -1);
  const rangeY = getRandom(APPEARANCE_RANGE) * (getBool() ? 1 : -1);

  return {
    id: Date.now() + "",
    data,
    position: { x: x + rangeX, y: y + rangeY },
    type: "node",
  };
}
