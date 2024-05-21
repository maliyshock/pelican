import { BASIC, FOOD, INSECTS } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const INSECTS_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Insects",
  root: INSECTS,
  type: INSECTS,
  roles: [FOOD],
  rarity: BASIC,
  price: 2,
};
