import { FOOD, MUSHROOM, RARE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const MUSHROOM_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Mushroom",
  root: MUSHROOM,
  type: MUSHROOM,
  roles: [FOOD],
  price: 2,
};
