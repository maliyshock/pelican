import { GameNode, GameObject, Socket } from "~/types";
import { getRandom } from "~/utils/get-random.ts";
import { APPEARANCE_RANGE } from "~/constants/constants.ts";
import { getBool } from "~/utils/get-bool.ts";

interface CreateNode {
  position: {
    x: number;
    y: number;
    strict?: boolean;
  };
  data: GameObject;
  draggable?: boolean;
}

// TODO: inputs and outputs types for the future
export function createNode({ position: { x, y, strict = true }, data, draggable = true }: CreateNode): GameNode {
  const rangeX = strict ? x : getRandom(APPEARANCE_RANGE) * (getBool() ? 1 : -1);
  const rangeY = strict ? y : getRandom(APPEARANCE_RANGE) * (getBool() ? 1 : -1);
  const inputs: Socket[] = data.inputTypes?.map(type => ({ id: `${data.type}_input`, name: "input", type })) || [{ id: `${data.type}_input`, name: "input" }];
  const outputs: Socket[] = data.outputTypes?.map(type => ({ id: `${data.type}_output`, name: "output", type })) || [
    { id: `${data.type}_output`, name: "output" },
  ];

  return {
    id: `${data.type}_${Date.now()}`,
    data: {
      ...data,
      img: { src: `/assets/${data.type}.jpg`, alt: data.type },
      inputs,
      outputs,
    },
    ...(!draggable ? { dragHandle: `.this .handler .should .never .exist .for .character .type ._${Date.now()}` } : {}),
    position: { x: x + rangeX, y: y + rangeY },
    type: "node",
  };
}
