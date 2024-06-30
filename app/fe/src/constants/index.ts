import { createNode } from "~/utils/create-node.ts";
import { BERRY, FIRE_PLACE, FOX, GOOSE_GRASS, PELICAN, TRANQUIL_GLADE, TREE } from "@pelican/constants";

export const APPEARANCE_RANGE = 200;
export const INIT_NODES = [
  createNode({ position: { x: -100, y: 0 }, data: PELICAN }),
  createNode({ position: { x: 0, y: -150, strict: false }, data: TRANQUIL_GLADE }),
  createNode({ position: { x: 100, y: 150 }, data: FOX, draggable: false }),
  createNode({ position: { x: 200, y: 200, strict: false }, data: BERRY }),
  createNode({ position: { x: 350, y: 350, strict: false }, data: TREE }),
  createNode({ position: { x: -350, y: -350, strict: false }, data: FIRE_PLACE }),
  createNode({ position: { x: -450, y: -450, strict: false }, data: GOOSE_GRASS }),
  // createNode({ position: { x: -200, y: -200 }, data: TREE }),
];

export const AVERAGE_DELIVERY_SPEED = 25; // px per second
