import { GameNode, GameNodeData } from "~/types";
import { getRandom } from "~/utils/get-random.ts";
import { APPEARANCE_RANGE } from "~/constants/constants.ts";
import { getBool } from "~/utils/get-bool.ts";

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
  const rangeX = strict ? x : getRandom(APPEARANCE_RANGE) * (getBool() ? 1 : -1);
  const rangeY = strict ? y : getRandom(APPEARANCE_RANGE) * (getBool() ? 1 : -1);

  return {
    id: `${data.type}_${Date.now()}`,
    data: {
      ...data,
      img: { src: `/assets/${data.type}.jpg`, alt: data.type },
    },
    ...(!draggable ? { dragHandle: `.this .handler .should .never .exist .for .character .type ._${Date.now()}` } : {}),
    position: { x: x + rangeX, y: y + rangeY },
    type: "node",
  };
}
