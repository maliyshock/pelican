import { BASIC, BONES, RESOURCE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const BONES_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Bones",
  root: BONES,
  type: BONES,
  roles: [RESOURCE],
  price: 2,
};
