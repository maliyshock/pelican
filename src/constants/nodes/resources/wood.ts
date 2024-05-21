import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { BASIC, RESOURCE, TREE, WOOD } from "~/constants/dictionary.ts";

import { TREE, WOOD } from "~/constants/dictionary.ts";
export const WOOD_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Wood",
  type: WOOD,
  root: TREE,
  roles: [RESOURCE],
  rarity: BASIC,
  price: 1,
};
