import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { APPLE_TREE, REALLY_RARE, RESOURCE_DEPOSIT } from "~/constants/dictionary.ts";

export const APPLE_TREE_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Apple tree",
  type: APPLE_TREE,
  root: APPLE_TREE,
  health: 3,
  roles: [RESOURCE_DEPOSIT],
  price: 1,
};
