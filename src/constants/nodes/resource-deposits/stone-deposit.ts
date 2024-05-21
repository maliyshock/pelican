import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { BASIC, RESOURCE_DEPOSIT, STONE_DEPOSIT } from "~/constants/dictionary.ts";

import { STONE_DEPOSIT, STONE_DEPOSIT } from "~/constants/dictionary.ts";
export const STONE_DEPOSIT_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Stone Deposit",
  root: STONE_DEPOSIT,
  type: STONE_DEPOSIT,
  health: 3,
  roles: [RESOURCE_DEPOSIT],
  rarity: BASIC,
  price: 1,
};
