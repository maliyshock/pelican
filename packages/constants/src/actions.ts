// declare all possible actions
import { ActionKind, RoleKind } from "~/types";

export type Actions = {
  [K in RoleKind]?: Partial<{
    [J in RoleKind]?: ActionKind[];
  }>;
};

export const ACTIONS_DICTIONARY: Actions = {
  player: {
    "region": ["explore"],
    "resource-deposit": ["harvest"],
    "character": ["fight", "talk"],
  },
};
