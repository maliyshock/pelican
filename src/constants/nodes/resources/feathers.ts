import { FEATHERS, RARE, RESOURCE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const FEATHERS_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Feathers",
  root: FEATHERS,
  type: FEATHERS,
  roles: [RESOURCE],
  price: 2,
};
