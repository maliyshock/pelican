import { GameObject, ObjectKeyName } from "~/types";
import { POOP_OBJECT, ROCK_OBJECT, STONE_OBJECT, TREE_OBJECT, WOOD_OBJECT } from "~/constants/nodes/resources.ts";
import { FOREST, ROCK, TREE } from "~/constants/dictionary.ts";

export const RECIPES: {
  [K in ObjectKeyName]?: Array<Array<GameObject>>;
} = {
  [FOREST]: [[TREE_OBJECT, ROCK_OBJECT], [POOP_OBJECT]],
  [TREE]: [[WOOD_OBJECT]],
  [ROCK]: [[STONE_OBJECT]],
};
