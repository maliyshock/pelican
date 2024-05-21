import { COMMON, FOOD, GRAIN } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const GRAIN_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Grain",
  root: GRAIN,
  type: GRAIN,
  roles: [FOOD],
  rarity: COMMON,
  price: 2,
};
