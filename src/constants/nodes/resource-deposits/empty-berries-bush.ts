import { GameNodeData } from "~/types";
import { EMPTY_BERRIES_BUSH } from "~/constants/dictionary.ts";
import { BERRIES_BUSH_DATA } from "~/constants/nodes/resource-deposits/berries-bush.ts";

export const EMPTY_BERRIE_BUSH_DATA: GameNodeData = {
  ...BERRIES_BUSH_DATA,
  title: "Empty Berries Bush",
  type: EMPTY_BERRIES_BUSH,
};
