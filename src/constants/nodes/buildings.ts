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

export const FIRE_PLACE: GameNodeData = {
  inputs: [createSocket()],
  outputs: [createSocket(), createSocket(), createSocket()],
  title: "Fire Place",
  roles: [BUILDING],
  type: BUILDING,
  health: 5,
};

export const STONE_WALL: GameNodeData = {
  title: "Stone WAll",
  roles: [BUILDING],
  type: BUILDING,
  health: 5,
};
