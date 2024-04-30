import { GameObject, ObjectKeyName } from "~/types";
import { PLANK_OBJECT, POOP_OBJECT, STONE_OBJECT, TREE_OBJECT, WOOD_OBJECT } from "~/constants/nodes/resources.ts";
import { FOREST, STONE_DEPOSIT, TREE } from "~/constants/dictionary.ts";

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
  [K in ObjectKeyName]?: Array<Array<GameObject>>;
} = {
  [FOREST]: [[TREE_OBJECT, STONE_OBJECT], [POOP_OBJECT], [PLANK_OBJECT]],
  [TREE]: [[WOOD_OBJECT], [], []], // apple // nut // stick // leaf
  [STONE_DEPOSIT]: [[STONE_OBJECT]],
};
