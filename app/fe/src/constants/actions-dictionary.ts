import { Action, Role } from "../../../common/src/types";
import { ATTACKING, CHARACTER, EXPLORING, HARVESTING, PLAYER, REGION, RESOURCE_DEPOSIT, TALKING } from "@pelican/constants/dist/constants/dictionary";

// declare all possible actions
export type ActionsDictionary = {
  [K in Role]?: Partial<{
    [J in Role]: Action[] | undefined;
  }>;
};

export const ACTIONS_DICTIONARY: ActionsDictionary = {
  [PLAYER]: {
    [REGION]: [EXPLORING],
    [RESOURCE_DEPOSIT]: [HARVESTING],
    [CHARACTER]: [ATTACKING, TALKING],
  },
};

// player role
const someObj = {
  _id: { $oid: "666061425aa5c4f8e3fd848d" },
  value: "player",
  connections: ["ALL"],
  actions: [
    {
      roleId: "666061425aa5c4f8e3fd848b", // REGION
      list: ["666077d8af270ce9bba34406"], // EXPLORING
    },
    {
      roleId: "666061425aa5c4f8e3fd8487", // RESOURCE_DEPOSIT
      list: ["666077aeaf270ce9bba34403"], // HARVESTING
    },
    {
      roleId: "666061425aa5c4f8e3fd848e", // CHARACTER
      list: ["666077bdaf270ce9bba34404", "666077ceaf270ce9bba34405"], // ATTACKING + TALKING
    },
  ],
};

export const PLAYER_Role = {
  [PLAYER]: {
    [REGION]: [EXPLORING],
    [RESOURCE_DEPOSIT]: [HARVESTING],
    // resource: [COMBINING],
    // food: ["eat"],
    [CHARACTER]: [ATTACKING, TALKING],
  },
};
