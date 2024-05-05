import { EntityType, GameNodeData } from "~/types";
import { PLANK_ENTITY, POOP_ENTITY, STONE_ENTITY, WOOD_ENTITY } from "~/constants/nodes/resources.ts";
import { FOREST, STONE_DEPOSIT, TREE } from "~/constants/dictionary.ts";
import { STONE_DEPOSIT_ENTITY, TREE_ENTITY } from "~/constants/nodes/resource-deposits.ts";

// just a reminder, remove later
// const rarityMap = {
//   "basic": 0,
//   "common": 1,
//   "unique": 2,
//   "rare": 3,
//   "really-really-rare": 4,
//   "legendary": 5,
// };

export const RESOURCE_NODES: {
  [K in EntityType]?: Array<Array<GameNodeData>>;
} = {
  [FOREST]: [[TREE_ENTITY, STONE_ENTITY, STONE_DEPOSIT_ENTITY], [POOP_ENTITY], [PLANK_ENTITY]],
  [TREE]: [[WOOD_ENTITY], [], []], // apple // nut // stick // leaf
  [STONE_DEPOSIT]: [[STONE_ENTITY]],
};
