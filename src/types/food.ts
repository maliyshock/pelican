import { ACORN, APPLE, BERRY, EGG, FISH, GRAIN, HONEY, INSECTS, LARVAE, MUSHROOM, NUT, WILD_GRAPES } from "~/constants/dictionary.ts";

export type Food =
  | typeof ACORN
  | typeof APPLE
  | typeof BERRY
  | typeof EGG
  | typeof FISH
  | typeof GRAIN
  | typeof HONEY
  | typeof INSECTS
  | typeof LARVAE
  | typeof MUSHROOM
  | typeof WILD_GRAPES
  | typeof NUT;
