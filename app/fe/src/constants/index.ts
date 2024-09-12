import { createNode } from "~/utils/create-node.ts";
import { BERRY, FIRE_PLACE, FOX, GOOSE_GRASS, PELICAN, TRANQUIL_GLADE, TREE } from "@pelican/constants";
export const MAP_SIZE_WIDTH = 1800;
export const MAP_SIZE_HEIGHT = 1200;
export const FOG_SIZE = 200;

export const APPEARANCE_RANGE = 200;
export const INIT_NODES = [
  createNode({ type: "node", position: { x: -100, y: 0 }, data: PELICAN }),
  createNode({ type: "node", position: { x: 0, y: -150, strict: false }, data: TRANQUIL_GLADE }),
  createNode({ type: "node", position: { x: 100, y: 150 }, data: FOX, draggable: false }),
  createNode({ type: "node", position: { x: 200, y: 200, strict: false }, data: BERRY }),
  createNode({ type: "node", position: { x: 350, y: 350, strict: false }, data: TREE }),
  createNode({ type: "node", position: { x: -350, y: -350, strict: false }, data: FIRE_PLACE }),
  createNode({ type: "node", position: { x: -450, y: -450, strict: false }, data: GOOSE_GRASS }),
  createNode({
    type: "border",
    width: 2 * MAP_SIZE_WIDTH,
    height: 200,
    position: { x: -MAP_SIZE_WIDTH, y: -MAP_SIZE_HEIGHT, strict: true },
    className: "",
    data: {
      avoid: "bottom",
      movable: "false",
    },
    style: { width: 2 * MAP_SIZE_WIDTH, height: `${FOG_SIZE}px` },
    draggable: false,
  }),
  createNode({
    type: "border",
    height: 2 * MAP_SIZE_HEIGHT,
    width: 200,
    position: { x: -MAP_SIZE_WIDTH, y: -MAP_SIZE_HEIGHT, strict: true },
    data: {
      avoid: "right",
      movable: "false",
    },
    style: { height: 2 * MAP_SIZE_HEIGHT, width: `${FOG_SIZE}px` },
    draggable: false,
  }),
  createNode({
    type: "border",
    width: 2 * MAP_SIZE_WIDTH,
    height: 200,
    position: { x: -MAP_SIZE_WIDTH, y: MAP_SIZE_HEIGHT - FOG_SIZE, strict: true },
    data: {
      avoid: "top",
      movable: "false",
    },
    style: { width: 2 * MAP_SIZE_WIDTH, height: "200px" },
    draggable: false,
  }),
  createNode({
    type: "border",
    height: 2 * MAP_SIZE_HEIGHT,
    width: 200,
    position: { x: MAP_SIZE_WIDTH - FOG_SIZE, y: -MAP_SIZE_HEIGHT, strict: true },
    data: {
      avoid: "left",
      movable: "false",
    },
    style: { height: 2 * MAP_SIZE_HEIGHT, width: "200px" },
    draggable: false,
  }),
  // createNode({ position: { x: -200, y: -200 }, data: TREE }),
];

export const AVERAGE_DELIVERY_SPEED = 25; // px per second
