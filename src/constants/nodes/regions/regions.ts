import { FOREST, REGION } from "~/constants/dictionary.ts";
import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";

export const FOREST_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Forest",
  roles: [REGION],
  type: FOREST,
  health: 3,
};
