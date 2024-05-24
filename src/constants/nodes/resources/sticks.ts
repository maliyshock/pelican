import { BASIC, RESOURCE, STICKS } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const STICKS_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Sticks",
  root: STICKS,
  type: STICKS,
  roles: [RESOURCE],
  price: 2,
};
