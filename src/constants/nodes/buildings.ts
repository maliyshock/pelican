import { BUILDING, STONE, WOOD } from "~/constants/dictionary.ts";
import { GameObject } from "~/types";

export const TEST_STRUCTURE_ENTITY: GameObject = {
  inputTypes: [WOOD],
  outputTypes: [STONE],
  dmg: 1,
  health: 10,
  type: BUILDING,
  roles: [BUILDING],
};
