import { createNode } from "~/utils/create-node.ts";
import { FOX_DATA, PELICAN_DATA } from "../../../nodes/characters/characters.ts";
import { FOREST_DATA } from "../../../nodes/regions/regions.ts";
import { TREE_DATA } from "../../../nodes/resource-deposits";

export const APPEARANCE_RANGE = 200;
export const INIT_NODES = [
  createNode({ position: { x: -100, y: 0 }, data: PELICAN_DATA }),
  createNode({ position: { x: 0, y: -150 }, data: FOREST_DATA }),
  createNode({ position: { x: 100, y: 50 }, data: FOX_DATA, draggable: false }),
  createNode({ position: { x: 200, y: 200 }, data: TREE_DATA }),
  createNode({ position: { x: 150, y: 150 }, data: TREE_DATA }),
  createNode({ position: { x: -200, y: -200 }, data: TREE_DATA }),
];

export const CONCAT_SYMBOL = "+";
