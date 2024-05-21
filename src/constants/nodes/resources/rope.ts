import { RARE, RESOURCE, ROPE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const ROPE_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Rope",
  root: ROPE,
  type: ROPE,
  roles: [RESOURCE],
  rarity: RARE,
  price: 2,
};
