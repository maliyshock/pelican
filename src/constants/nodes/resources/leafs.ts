import { BASIC, LEAFS, RESOURCE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const LEAFS_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Leafs",
  root: LEAFS,
  type: LEAFS,
  roles: [RESOURCE],
  price: 2,
};
