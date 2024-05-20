import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { BASIC, STONE, STONE_DEPOSIT } from "~/constants/dictionary.ts";

export const STONE_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Piece of stone",
  type: STONE,
  root: STONE_DEPOSIT,
  quantity: 1,
  roles: ["resource"],
  rarity: BASIC,
  price: 1,
};
