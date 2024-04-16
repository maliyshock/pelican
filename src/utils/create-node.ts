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
  const targetX = getRandom(x + APPEARANCE_RANGE);
  const targetY = getRandom(y + APPEARANCE_RANGE);
  return {
    id: `tree_${Date.now()}`,
    data,
    position: { x: getBool() ? targetX : -targetX, y: getBool() ? targetY : -targetY },
    type: "node",
  };
}
