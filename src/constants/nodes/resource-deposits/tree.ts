import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { BASIC, RESOURCE_DEPOSIT, TREE } from "~/constants/dictionary.ts";

import { TREE, TREE } from "~/constants/dictionary.ts";
export const TREE_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Tree",
  type: TREE,
  root: TREE,
  health: 3,
  roles: [RESOURCE_DEPOSIT],
  rarity: BASIC,
  price: 1,
};
