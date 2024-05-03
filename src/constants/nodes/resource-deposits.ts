import { GameObject } from "~/types";
import { BASIC, STONE_DEPOSIT, TREE } from "~/constants/dictionary.ts";

export const TREE_ENTITY: GameObject = {
  outputTypes: [],
  title: "Tree",
  type: TREE,
  root: TREE,
  health: 3,
  roles: ["resourceDeposit"],
  rarity: BASIC,
  price: 1,
};

export const STONE_DEPOSIT_ENTITY: GameObject = {
  outputTypes: [],
  title: "Stone Deposit",
  root: STONE_DEPOSIT,
  type: STONE_DEPOSIT,
  health: 3,
  roles: ["resourceDeposit"],
  rarity: BASIC,
  price: 1,
};
