import { BUILDING } from "~/constants/dictionary.ts";
import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";

export const TEST_STRUCTURE_ENTITY: GameNodeData = {
  inputs: [createSocket()],
  outputs: [createSocket()],
  dmg: 1,
  health: 10,
  type: BUILDING,
  roles: [BUILDING],
};
