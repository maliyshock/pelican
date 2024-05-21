import { FOOD, REALLY_RARE, WILD_GRAPES } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const WILD_GRAPES_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Wild Grapes",
  root: WILD_GRAPES,
  type: WILD_GRAPES,
  roles: [FOOD],
  rarity: REALLY_RARE,
  price: 2,
};
