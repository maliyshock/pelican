import { APPLE, FOOD } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const APPLE_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Apple",
  root: APPLE,
  type: APPLE,
  roles: [FOOD],
  price: 2,
};
