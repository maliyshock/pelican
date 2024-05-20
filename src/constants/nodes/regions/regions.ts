import { FOREST } from "~/constants/dictionary.ts";
import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";

export const FOREST_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Forest",
  roles: ["region"],
  type: FOREST,
  health: 3,
};
