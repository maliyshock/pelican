import { FOX_DATA, PELICAN_DATA } from "~/constants/nodes/characters/characters.ts";
import { FOREST_DATA } from "~/constants/nodes/regions/regions.ts";
import { createNode } from "~/utils/create-node.ts";

export const APPEARANCE_RANGE = 200;
export const INIT_NODES = [
  createNode({ position: { x: -100, y: 0 }, data: PELICAN_DATA }),
  createNode({ position: { x: 0, y: -150 }, data: FOREST_DATA }),
  createNode({ position: { x: 100, y: 0 }, data: FOX_DATA, draggable: false }),
];

export const CONCAT_SYMBOL = "+";
