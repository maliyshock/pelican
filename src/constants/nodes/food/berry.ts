import { BASIC, FOOD } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";
import { BERRY } from "~/constants/dictionary.ts";

export const BERRY_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Berry",
  root: BERRY,
  type: BERRY,
  roles: [FOOD],
  rarity: BASIC,
  price: 2,
};
