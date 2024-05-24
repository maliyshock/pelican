import { GameNodeData } from "~/types";
import { LAKE, RARE, RESOURCE_DEPOSIT } from "~/constants/dictionary.ts";
import { createSocket } from "~/utils/create-socket.ts";

import { LAKE, LAKE } from "~/constants/dictionary.ts";
export const LAKE_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Lake",
  root: LAKE,
  type: LAKE,
  health: 3,
  roles: [RESOURCE_DEPOSIT],
  price: 1,
  description:
    "nature's tranquil bathtub, perfect for serene reflections, spontaneous swims, and the occasional paddleboat adventure, serving as a picturesque reminder that even the planet likes to take a moment to just float",
};
