import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { BASIC, RESOURCE, TREE, WOOD } from "~/constants/dictionary.ts";

export const WOOD_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Wood",
  type: WOOD,
  root: TREE, // not sure it should be here
  roles: [RESOURCE],
  price: 1,
};
