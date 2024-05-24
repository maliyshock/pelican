import { EGG, FOOD } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";
export const EGG_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Egg",
  root: EGG,
  type: EGG,
  roles: [FOOD],
  price: 2,
};
