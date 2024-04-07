import { Action } from "~/types";

// declare all possible actions
export type Dictionary = {
  [key: string]: {
    [innerKey: string]: Action[] | undefined;
  };
};

export const dictionary: Dictionary = {
  player: {
    world: ["explore"],
  },
};
