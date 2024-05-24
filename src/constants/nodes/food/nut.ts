import { FOOD, NUT } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const NUT_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "NUT",
  root: NUT,
  type: NUT,
  roles: [FOOD],
  price: 2,
};
