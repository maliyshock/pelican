import { RARE, RESOURCE, Skin } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const Skin_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Some, um... skin",
  root: Skin,
  type: Skin,
  roles: [RESOURCE],
  rarity: RARE,
  price: 2,
};
