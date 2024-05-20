import { Action, Role } from "~/types";
import { ATTACKING, EXPLORING, HARVESTING, TALKING } from "~/constants/dictionary.ts";

// declare all possible actions
export type ActionsDictionary = {
  [K in Role]?: Partial<{
    [J in Role]: Action[] | undefined;
  }>;
};

export const ACTIONS_DICTIONARY: ActionsDictionary = {
  player: {
    region: [EXPLORING],
    resourceDeposit: [HARVESTING],
    // resource: [COMBINING],
    // food: ["eat"],
    character: [ATTACKING, TALKING],
  },
  // character: {
  //   food: ["eat"],
  //   player: ["attack"],
  // },
  // enemy: {
  //   player: ["attack"],
  //   resourceDeposit: ["attack"],
  //   resource: ["attack"],
  //   building: ["attack"],
  // },
  // resource: {
  //   resource: [COMBINING],
  // },
};
