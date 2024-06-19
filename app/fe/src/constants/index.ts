import { createNode } from "~/utils/create-node.ts";
import { FOREST, FOX, PELICAN, TREE } from "@pelican/constants";

export const APPEARANCE_RANGE = 200;
export const INIT_NODES = [
  createNode({ position: { x: -100, y: 0 }, data: PELICAN }),
  createNode({ position: { x: 0, y: -150 }, data: FOREST }),
  createNode({ position: { x: 100, y: 50 }, data: FOX, draggable: false }),
  createNode({ position: { x: 200, y: 200 }, data: TREE }),
  // createNode({ position: { x: 150, y: 150 }, data: TREE }),
  // createNode({ position: { x: -200, y: -200 }, data: TREE }),
];
