import { FOOD, RARE, APPLE, APPLE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";
import { APPLE } from "~/constants/dictionary.ts";

export const APPLE_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Apple",
  root: APPLE,
  type: APPLE,
  roles: [FOOD],
  rarity: RARE,
  price: 2,
};
