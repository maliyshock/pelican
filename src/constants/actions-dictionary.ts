import { Action } from "~/types";

// declare all possible actions
export type ActionsDictionary = {
  [key: string]: {
    [innerKey: string]: Action[] | undefined;
  };
};

export const ACTIONS_DICTIONARY: ActionsDictionary = {
  player: {
    forest: ["explore"],
  },
};
