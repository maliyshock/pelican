import { RARE, RESOURCE, SKIN } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const SKIN_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Some, um... skin",
  root: SKIN,
  type: SKIN,
  roles: [RESOURCE],
  rarity: RARE,
  price: 2,
};
