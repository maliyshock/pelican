import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { BASIC, TREE } from "~/constants/dictionary.ts";

export const TREE_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Tree",
  type: TREE,
  root: TREE,
  health: 3,
  roles: ["resourceDeposit"],
  rarity: BASIC,
  price: 1,
};
