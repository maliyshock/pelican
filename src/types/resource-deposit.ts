import { APPLE_TREE, BERRIES_BUSH, CLAY_DEPOSIT, EMPTY_BERRIES_BUSH, LAKE, NUT_TREE, RIVER, STONE_DEPOSIT, TREE } from "~/constants/dictionary.ts";

export type ResourceDeposit =
  | typeof TREE
  | typeof STONE_DEPOSIT
  | typeof BERRIES_BUSH
  | typeof EMPTY_BERRIES_BUSH
  | typeof LAKE
  | typeof RIVER
  | typeof CLAY_DEPOSIT
  | typeof APPLE_TREE
  | typeof NUT_TREE;
