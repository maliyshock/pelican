import { CANE, RARE, RESOURCE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

// тростник
export const CANE_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Cane",
  root: CANE,
  type: CANE,
  roles: [RESOURCE],
  price: 2,
};
