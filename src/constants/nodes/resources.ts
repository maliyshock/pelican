import { BASIC, COMMON, PLANK, POOP, RESOURCE, STONE, STONE_DEPOSIT, TREE, WOOD } from "~/constants/dictionary.ts";
import { GameObject } from "~/types";

export const TREE_OBJECT: GameObject = {
  title: "Tree",
  type: TREE,
  root: TREE,
  health: 3,
  roles: ["resourceDeposit"],
  rarity: BASIC,
  price: 1,
};

export const WOOD_OBJECT: GameObject = {
  title: "Wood",
  type: WOOD,
  root: TREE,
  quantity: 1,
  roles: [RESOURCE],
  rarity: BASIC,
  price: 1,
};

export const PLANK_OBJECT: GameObject = {
  title: "Plank",
  root: TREE,
  quantity: 1,
  roles: [RESOURCE],
  type: PLANK,
  rarity: BASIC,
  price: 2,
};

export const STONE_DEPOSIT_OBJECT: GameObject = {
  title: "Stone Deposit",
  root: STONE_DEPOSIT,
  type: STONE_DEPOSIT,
  health: 3,
  roles: ["resourceDeposit"],
  rarity: BASIC,
  price: 1,
};

export const STONE_OBJECT: GameObject = {
  title: "Piece of stone",
  type: STONE,
  root: STONE_DEPOSIT,
  quantity: 1,
  roles: ["resource"],
  rarity: BASIC,
  price: 1,
};

export const POOP_OBJECT: GameObject = {
  title: "Poop",
  type: POOP,
  roles: ["resource", "food"],
  rarity: COMMON,
  price: 1,
};
