import { FOX_ENTITY, PELICAN_ENTITY } from "~/constants/nodes/characters.ts";
import { FOREST_ENTITY } from "~/constants/nodes/regions.ts";
import { createNode } from "~/utils/create-node.ts";

export const APPEARANCE_RANGE = 200;
export const INIT_NODES = [
  createNode({ position: { x: -100, y: 0 }, data: PELICAN_ENTITY }),
  createNode({ position: { x: 0, y: -150 }, data: FOREST_ENTITY }),
  createNode({ position: { x: 100, y: 0 }, data: FOX_ENTITY, draggable: false }),
];
