import { BASIC, FOOD, ACORN, ACORN } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";
import { ACORN } from "~/constants/dictionary.ts";

export const ACORN_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Acorn",
  root: ACORN,
  type: ACORN,
  roles: [FOOD],
  rarity: BASIC,
  price: 2,
};
