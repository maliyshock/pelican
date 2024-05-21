import { GameNodeData } from "~/types";
import { createSocket } from "~/utils/create-socket.ts";
import { BERRIES_BUSH, COMMON, FOOD, RESOURCE_DEPOSIT } from "~/constants/dictionary.ts";

import { BERRIES_BUSH, BERRIES_BUSH } from "~/constants/dictionary.ts";
export const BERRIES_BUSH_DATA: GameNodeData = {
  inputs: [createSocket()],
  title: "Berries Bush",
  root: BERRIES_BUSH,
  type: BERRIES_BUSH,
  health: 3,
  roles: [RESOURCE_DEPOSIT, FOOD],
  rarity: COMMON,
  price: 1,
  description:
    "Small Bush with Juicy Berries: nature's snack bar, conveniently bite-sized and packed with a burst of flavor, perfect for foragers and hungry hikers looking for a sweet, tangy treat straight from the wild.",
};
