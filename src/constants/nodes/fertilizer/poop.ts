import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { COMMON, FERTILIZER, FOOD, POOP, RESOURCE } from "~/constants/dictionary.ts";

export const POOP_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Poop",
  type: POOP,
  roles: [FERTILIZER, RESOURCE, FOOD],
  price: 1,
};
