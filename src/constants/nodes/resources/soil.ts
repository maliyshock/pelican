import { COMMON, RESOURCE, SOIL } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";
import { GameNodeData } from "~/types";

export const SOIL_DATA: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  title: "Soil",
  root: SOIL,
  type: SOIL,
  roles: [RESOURCE],
  price: 2,
};
