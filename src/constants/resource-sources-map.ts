import { EntityType, GameNodeData } from "~/types";

import { APPLE_TREE, BERRIES_BUSH, DEEP_FOREST, FOREST, LAKE, NUT_TREE, RIVER, STONE_DEPOSIT, TREE } from "~/constants/dictionary.ts";
import {
  ANTHILL_DATA,
  BONES_DATA,
  CANE_DATA,
  FLINT_DATA,
  LEAFS_DATA,
  PLANK_DATA,
  SKIN_DATA,
  SOIL_DATA,
  STICKS_DATA,
  STONE_DATA,
  VINE_DATA,
  WOOD_DATA,
} from "~/constants/nodes/resources";
import { BERRIES_BUSH_DATA, CLAY_DEPOSIT_DATA, LAKE_DATA, RIVER_DATA, STONE_DEPOSIT_DATA, TREE_DATA } from "~/constants/nodes/resource-deposits";
import { POOP_DATA } from "~/constants/nodes/fertilizer";
import { ACORN_DATA, APPLE_DATA, BERRY_DATA, EGG_DATA, FISH_DATA, GRAIN_DATA, MUSHROOM_DATA, NUT_DATA, WILD_GRAPES_DATA } from "~/constants/nodes/food";

type ResourceContainers = {
  [key in EntityType]?: Array<GameNodeData>;
};

// tier 1
// tier 2
export const RESOURCE_CONTAINERS: ResourceContainers = {
  [FOREST]: [
    TREE_DATA,
    STONE_DATA,
    STONE_DEPOSIT_DATA,
    FLINT_DATA,
    LEAFS_DATA,
    STONE_DATA,
    STICKS_DATA,
    WOOD_DATA,
    VINE_DATA,
    APPLE_DATA,
    ACORN_DATA,
    STONE_DATA,
    BERRY_DATA,
    BERRIES_BUSH_DATA,
    POOP_DATA,
    SOIL_DATA,
    GRAIN_DATA,
    ANTHILL_DATA,
    PLANK_DATA,
    WILD_GRAPES_DATA,
  ],
  [DEEP_FOREST]: [LAKE_DATA, RIVER_DATA, EGG_DATA, BONES_DATA, SKIN_DATA, MUSHROOM_DATA],
  [TREE]: [WOOD_DATA, LEAFS_DATA, STICKS_DATA],
  [APPLE_TREE]: [APPLE_DATA],
  [NUT_TREE]: [NUT_DATA],
  [STONE_DEPOSIT]: [STONE_DATA, FLINT_DATA],
  [BERRIES_BUSH]: [BERRY_DATA], // I would like to get a bonus sometimes like LARVAE
  [LAKE]: [FISH_DATA, CANE_DATA, CLAY_DEPOSIT_DATA],
  [RIVER]: [FISH_DATA, CANE_DATA], // trash (plastic, glass, cans)
};
