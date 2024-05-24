import { BASIC, FOOD, LARVAE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const LARVAE_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Larvae",
  root: LARVAE,
  type: LARVAE,
  roles: [FOOD],
  price: 2,
};
