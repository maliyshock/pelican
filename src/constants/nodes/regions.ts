import { FOREST } from "~/constants/dictionary.ts";
import { GameObject } from "~/types";

export const FOREST_ENTITY: GameObject = {
  outputTypes: [], // no output
  title: "Forest",
  roles: ["region"],
  type: FOREST,
  health: 3,
};
