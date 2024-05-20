import { EntityType, GameNodeData } from "~/types";

import { FOREST, STONE_DEPOSIT, TREE } from "~/constants/dictionary.ts";
import { TREE_DATA } from "~/constants/nodes/resource-deposits/tree.ts";
import { STONE_DATA } from "~/constants/nodes/resources/stone.ts";
import { STONE_DEPOSIT_DATA } from "~/constants/nodes/resource-deposits/stone-deposit.ts";
import { POOP_DATA } from "~/constants/nodes/fertilizer/poop.ts";
import { PLANK_DATA } from "~/constants/nodes/resources/plank.ts";
import { WOOD_DATA } from "~/constants/nodes/resources/wood.ts";

// just a reminder, remove later
// const rarityMap = {
//   "basic": 0,
//   "common": 1,
//   "rare": 3,
//   "really-really-rare": 4,
//   "unique": 2,
//   "legendary": 5,
// };

export const RESOURCE_CONTAINERS: {
  [K in EntityType]?: Array<Array<GameNodeData>>;
} = {
  [FOREST]: [[TREE_DATA, STONE_DATA, STONE_DEPOSIT_DATA], [POOP_DATA], [PLANK_DATA]],
  [TREE]: [[WOOD_DATA], [], []], // apple // nut // stick // leaf
  [STONE_DEPOSIT]: [[STONE_DATA]],
};
