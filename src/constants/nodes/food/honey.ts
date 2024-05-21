import { FOOD, RARE, HONEY, HONEY } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";
import { HONEY } from "~/constants/dictionary.ts";
export const HONEY_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Honey",
  root: HONEY,
  type: HONEY,
  roles: [FOOD],
  rarity: RARE,
  price: 2,
};
