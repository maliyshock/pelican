import { ANTHILL, BONES, CANE, FEATHERS, FLINT, LEAFS, PLANK, PLANT_FIBERS, ROPE, SKIN, SOIL, STICKS, STONE, TREE, VINE, WOOD } from "~/constants/dictionary";

export type Resource =
  | typeof WOOD
  | typeof PLANK
  | typeof STONE
  | typeof TREE
  | typeof ANTHILL
  | typeof BONES
  | typeof CANE
  | typeof FEATHERS
  | typeof FLINT
  | typeof LEAFS
  | typeof ROPE
  | typeof SKIN
  | typeof SOIL
  | typeof STICKS
  | typeof VINE
  | typeof PLANT_FIBERS
  | typeof SKIN;
