import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { BASIC, CLAY_DEPOSIT, RESOURCE_DEPOSIT } from "~/constants/dictionary.ts";

export const CLAY_DEPOSIT_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Clay Deposit",
  root: CLAY_DEPOSIT,
  type: CLAY_DEPOSIT,
  health: 3,
  roles: [RESOURCE_DEPOSIT],
  rarity: BASIC,
  price: 1,
};
