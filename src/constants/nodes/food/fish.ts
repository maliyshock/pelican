import { FISH, FOOD } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const FISH_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Fish",
  root: FISH,
  type: FISH,
  roles: [FOOD],
  price: 2,
};
