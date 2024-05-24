import { BASIC, PLANT_FIBERS, RESOURCE } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const PLANT_FIBERS_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Plant Fibers",
  root: PLANT_FIBERS,
  type: PLANT_FIBERS,
  roles: [RESOURCE],
  price: 2,
};
