import { BASIC, COMMON, PLANK, POOP, RESOURCE, STONE, STONE_DEPOSIT, TREE, WOOD } from "~/constants/dictionary.ts";
import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";

export const WOOD_ENTITY: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Wood",
  type: WOOD,
  root: TREE,
  quantity: 1,
  roles: [RESOURCE],
  rarity: BASIC,
  price: 1,
};

export const PLANK_ENTITY: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Plank",
  root: TREE,
  quantity: 1,
  roles: [RESOURCE],
  type: PLANK,
  rarity: BASIC,
  price: 2,
};

export const STONE_ENTITY: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Piece of stone",
  type: STONE,
  root: STONE_DEPOSIT,
  quantity: 1,
  roles: ["resource"],
  rarity: BASIC,
  price: 1,
};

export const POOP_ENTITY: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Poop",
  type: POOP,
  roles: ["resource", "food"],
  rarity: COMMON,
  price: 1,
};
