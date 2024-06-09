import { getRandom } from "./get-random.ts";
import { getBool } from "./get-bool.ts";
import { createImg } from "./create-img.ts";
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
  const rangeX = strict ? x : getRandom(APPEARANCE_RANGE) * (getBool() ? 1 : -1);
  const rangeY = strict ? y : getRandom(APPEARANCE_RANGE) * (getBool() ? 1 : -1);

  return {
    id: `${data.type}_${getRandom(Date.now())}`,
    data: {
      ...data,
      img: createImg(data.type),
    },
    ...(!draggable ? { dragHandle: `.this .handler .should .never .exist .for .character .type ._${getRandom(Date.now())}` } : {}),
    position: { x: x + rangeX, y: y + rangeY },
    type: "node",
  };
}
