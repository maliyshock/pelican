import { GameObject, ObjectKeyName } from "~/types";
import { PIECE_OF_STONE_OBJECT, PLANK_OBJECT, POOP_OBJECT, STONE_OBJECT, TREE_OBJECT, WOOD_OBJECT } from "~/constants/nodes/resources.ts";
import { FOREST, STONE, TREE } from "~/constants/dictionary.ts";

export const RESOURCE_NODES: {
  [K in ObjectKeyName]?: Array<Array<GameObject>>;
} = {
  [FOREST]: [[TREE_OBJECT, STONE_OBJECT], [POOP_OBJECT], [PLANK_OBJECT]],
  [TREE]: [[WOOD_OBJECT], [], []], // apple // nut // stick // leaf
  [STONE]: [[PIECE_OF_STONE_OBJECT]],
};
