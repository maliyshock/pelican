import { Action, Role } from "~/types";
import { ATTACKING, CRAFTING, EXPLORING, HARVESTING, TALKING } from "~/constants/dictionary.ts";

// declare all possible actions
export type ActionsDictionary = {
  [K in Role]?: Partial<{
    [J in Role]: Action[] | undefined;
  }>;
};

// TODO: this should be part of validation

// instead of that we can describe that food can be eaten by
// ... player ahd character
// in that case we get final node and list of actions to do as keys
// in that scenario it is hard to connect source and target
export const ACTIONS_DICTIONARY: ActionsDictionary = {
  player: {
    region: [EXPLORING],
    resourceDeposit: [HARVESTING],
    resource: [CRAFTING],
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
  //   resource: ["combine"],
  // },
};
