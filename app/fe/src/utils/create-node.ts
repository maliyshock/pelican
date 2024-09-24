import { getRandomNum } from "./get-random-num.ts";
import { getBool } from "./get-bool.ts";
import { APPEARANCE_RANGE } from "~/constants";
import generateID from "@pelican/utils/dist/generate-id";
import { GameNode, GameNodeData } from "@pelican/constants";

interface CreateNode {
  position: {
    x: number;
    y: number;
    strict?: boolean;
  };
  data: GameNodeData;
  draggable?: boolean;
  type: string;
}

// TODO: inputs and outputs types for the future
export function createNode({ position: { x, y, strict = true }, data, type, draggable = true, ...rest }: CreateNode) {
  const posX = strict ? x : x + getRandomNum(APPEARANCE_RANGE) * (getBool() ? 1 : -1);
  const posY = strict ? y : y + getRandomNum(APPEARANCE_RANGE) * (getBool() ? 1 : -1);

  return {
    ...rest,
    id: generateID(data?.type || type),
    data,
    ...(!draggable ? { dragHandle: "nodrag" } : {}),
    position: { x: posX, y: posY },
    type,
  } as GameNode;
}
