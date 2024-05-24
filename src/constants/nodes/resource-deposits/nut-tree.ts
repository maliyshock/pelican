import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { NUT_TREE, RESOURCE_DEPOSIT } from "~/constants/dictionary.ts";

export const NUT_TREE_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Nut tree",
  type: NUT_TREE,
  root: NUT_TREE,
  health: 3,
  roles: [RESOURCE_DEPOSIT],
  price: 1,
};
