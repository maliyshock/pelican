import { FOX_OBJECT, PELICAN_OBJECT } from "~/constants/nodes/characters.ts";
import { FOREST_OBJECT } from "~/constants/nodes/regions.ts";
import { createNode } from "~/utils/create-node.ts";

export const APPEARANCE_RANGE = 200;
export const INIT_NODES = [
  createNode({ position: { x: -100, y: 0 }, data: PELICAN_OBJECT }),
  createNode({ position: { x: 0, y: -150 }, data: FOREST_OBJECT }),
  createNode({ position: { x: 100, y: 0 }, data: FOX_OBJECT, draggable: false }),
];
