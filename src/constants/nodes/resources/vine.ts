import { RARE, RESOURCE, VINE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const VINE_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Vine",
  root: VINE,
  type: VINE,
  roles: [RESOURCE],
  rarity: RARE,
  price: 2,
};
