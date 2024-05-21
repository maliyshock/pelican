import { CHARACTER, FOX, PELICAN, PLAYER } from "~/constants/dictionary.ts";
import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";

import { PELICAN } from "~/constants/dictionary.ts";
export const PELICAN_DATA: GameNodeData = {
  dmg: 1,
  health: 10,
  // name: "George",
  type: PELICAN,
  roles: [PLAYER, CHARACTER],
  inputs: [createSocket()],
  outputs: [createSocket()],
};

export const FOX_DATA: GameNodeData = {
  dmg: 15,
  health: 35,
  title: "Fox",
  type: FOX,
  roles: [CHARACTER],
  inputs: [createSocket()],
  outputs: [createSocket()],
};
