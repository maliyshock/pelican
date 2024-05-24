import { GameNodeData } from "~/types";
import { RARE, RESOURCE_DEPOSIT, RIVER } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";

export const RIVER_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Lake",
  root: RIVER,
  type: RIVER,
  health: 3,
  roles: [RESOURCE_DEPOSIT],
  price: 1,
  description:
    "the planet's restless vein, carving paths through valleys and forests, sustaining life along its journey, and offering endless opportunities for exploration and adventure for those who dare to follow its flow",
};
