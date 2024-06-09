import { GameNodeData } from "~/types/game-node";
import { BERRIES_BUSH } from "~/nodes/resource-deposits/berries-bush";

export const EMPTY_BERRIE_BUSH: GameNodeData = {
  ...BERRIES_BUSH,
  title: "Empty Berries Bush",
  type: "empty-berries-bush",
};
