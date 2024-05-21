import { FOOD, REALLY_RARE, EGG, EGG } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";
import { EGG } from "~/constants/dictionary.ts";

import { EGG, EGG } from "~/constants/dictionary.ts";
export const EGG_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Egg",
  root: EGG,
  type: EGG,
  roles: [FOOD],
  rarity: REALLY_RARE,
  price: 2,
};
