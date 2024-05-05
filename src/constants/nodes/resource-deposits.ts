import { GameNodeData } from "~/types";
import { BASIC, STONE_DEPOSIT, TREE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";

export const TREE_ENTITY: GameNodeData = {
  inputs: [createSocket()],
  title: "Tree",
  type: TREE,
  root: TREE,
  health: 3,
  roles: ["resourceDeposit"],
  rarity: BASIC,
  price: 1,
};

export const STONE_DEPOSIT_ENTITY: GameNodeData = {
  inputs: [createSocket()],
  title: "Stone Deposit",
  root: STONE_DEPOSIT,
  type: STONE_DEPOSIT,
  health: 3,
  roles: ["resourceDeposit"],
  rarity: BASIC,
  price: 1,
};
