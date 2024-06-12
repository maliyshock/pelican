import { GameNodeData } from "~/types/game-node";
import { TREE } from "~/nodes/resource-deposits/tree";
import { STONE } from "~/nodes/resources/stone";
import { STONE_DEPOSIT } from "~/nodes/resource-deposits/stone-deposit";
import { POOP } from "~/nodes/others/poop";
import { PLANK } from "~/nodes/resources/plank";
import { WOOD } from "~/nodes/resources/wood";
import { ResourceContainer } from "~/types/resource-container";
import { ANTHILL } from "~/nodes/resources/anthill";
import { BONES } from "~/nodes/resources/bones";
import { CANE } from "~/nodes/resources/cane";
import { FEATHERS } from "~/nodes/resources/feathers";
import { FLINT } from "~/nodes/resources/flint";
import { LEAFS } from "~/nodes/resources/leafs";
import { PLANT_FIBERS } from "~/nodes/resources/plant-fibers";
import { ROPE } from "~/nodes/resources/rope";
import { SKIN } from "~/nodes/resources/skin";
import { SOIL } from "~/nodes/resources/soil";
import { STICK } from "~/nodes/resources/stick";
import { VINE } from "~/nodes/resources/vine";
import { BERRIES_BUSH } from "~/nodes/resource-deposits/berries-bush";
import { CLAY_DEPOSIT } from "~/nodes/resource-deposits/clay-deposit";
import { LAKE } from "~/nodes/resource-deposits/lake";
import { RIVER } from "~/nodes/resource-deposits/river";

export const RESOURCE_CONTAINERS: {
  [K in ResourceContainer]?: Array<GameNodeData>;
} = {
  "forest": [
    ANTHILL,
    BONES,
    CANE,
    FEATHERS,
    FLINT,
    LEAFS,
    PLANK,
    PLANT_FIBERS,
    ROPE,
    SKIN,
    SOIL,
    STICK,
    STONE,
    VINE,
    WOOD,
    BERRIES_BUSH,
    CLAY_DEPOSIT,
    LAKE,
    RIVER,
    STONE_DEPOSIT,
    TREE,
    POOP,
  ],
  // "deepForest": [],
  "tree": [WOOD], // apple // nut // stick // leaf
  "stone-deposit": [STONE],
};
