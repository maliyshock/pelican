import { COMMON, FLINT, RESOURCE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const FLINT_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Flint",
  root: FLINT,
  type: FLINT,
  roles: [RESOURCE],
  price: 2,
};
