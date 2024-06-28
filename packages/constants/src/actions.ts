import { RoleKind } from "~/types/roles";
import { ActionKind } from "~/types/actions";

export type Actions = {
  [K in RoleKind]?: Partial<{
    [J in RoleKind]?: ActionKind[];
  }>;
};

// TODO: should actions and connections live together?
export const ACTIONS_DICTIONARY: Actions = {
  player: {
    "region": ["explore"],
    "resource-deposit": ["harvest"],
    "character": ["fight", "talk"],
  },
  food: {
    player: ["eat"],
  },
  fuel: {
    "fire-source": ["burn"],
  },
};
