import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const TEST_STRUCTURE_ENTITY: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg(""),
  dmg: 1,
  health: 10,
  type: "building",
  roles: ["building"],
};

export const FIRE_PLACE: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1), createSocket(1), createSocket(1)],
  img: createImg("fire-place"),
  title: "Fire Place",
  type: "building",
  roles: ["building"],
  health: 3,
  fuel: {
    max: 150,
    amount: 50,
    maxHeat: 5,
  },
  price: 5,
};

export const STONE_WALL: GameNodeData = {
  img: createImg("stone-wall"),
  title: "Stone WAll",
  type: "stone-wall",
  roles: ["building"],
  health: 10,
};
