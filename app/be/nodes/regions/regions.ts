import { FOREST, REGION } from "../../common/src/constants/dictionary.ts";
import { GameNodeData } from "../../common/src/types";
import { createSocket } from "../../frontend/src/utils/create-socket.ts";

export const FOREST_DATA: GameNodeData = {
  inputs: [{limit: 1}],
  title: "Forest",
  roles: ["REGION"],
  type: "FOREST,
  health: 3,
};
