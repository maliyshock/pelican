import { ANTHILL, RESOURCE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const ANTHILL_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Anthill",
  root: ANTHILL,
  type: ANTHILL,
  roles: [RESOURCE],
  price: 2,
};
