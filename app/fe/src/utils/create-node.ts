import { getRandomNum } from "./get-random-num.ts";
import { getBool } from "./get-bool.ts";
import { GameNode, GameNodeData } from "@pelican/constants";
import { APPEARANCE_RANGE } from "~/constants";

interface CreateNode {
  position: {
    x: number;
    y: number;
    strict?: boolean;
  };
  data: GameNodeData;
  draggable?: boolean;
}

// TODO: inputs and outputs types for the future
export function createNode({ position: { x, y, strict = true }, data, draggable = true }: CreateNode): GameNode {
  const rangeX = strict ? x : getRandomNum(APPEARANCE_RANGE) * (getBool() ? 1 : -1);
  const rangeY = strict ? y : getRandomNum(APPEARANCE_RANGE) * (getBool() ? 1 : -1);

  return {
    id: `${data.type}_${getRandomNum(Date.now())}`,
    data,
    ...(!draggable ? { dragHandle: `.this .handler .should .never .exist .for .character .type ._${getRandomNum(Date.now())}` } : {}),
    position: { x: x + rangeX, y: y + rangeY },
    type: "node",
  };
}
