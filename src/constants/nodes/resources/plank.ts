import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { BASIC, PLANK, RESOURCE, TREE } from "~/constants/dictionary.ts";

export const PLANK_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Plank",
  root: TREE,
  roles: [RESOURCE],
  type: PLANK,
  price: 2,
};
