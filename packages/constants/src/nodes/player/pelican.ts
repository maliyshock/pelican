import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";
import { HARVEST } from "~/nodes/player/harvest";
import { EXPLORE } from "~/nodes/player/explore";

export interface Profile {
  weapon: null;
  craftingSpeed: number;
  attackSpeed: number;
  battleRank: number;
  satiety: number;
  maxSatiety: number;
  minSatiety: number;
  hungerStack: number;
  speedPenaltyLevel: number;
  explore: typeof EXPLORE;
  harvest: typeof HARVEST;
}

const initialPlayer: Profile = {
  weapon: null,
  attackSpeed: 2000,
  craftingSpeed: 2000, // TODO: crafting time should calculated on items amount, player crafting speed and resource rarity
  battleRank: 0,
  satiety: 30, // 1 =  60 seconds
  maxSatiety: 30,
  minSatiety: 0, // when we hit 0 we add + 1 stack to hunger
  hungerStack: 0,
  speedPenaltyLevel: 1, // for example if it is 1.5 - it means timer goes 1.5 slower
  explore: EXPLORE,
  harvest: HARVEST,
};

export const PELICAN: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("pelican"),
  type: "pelican",
  roles: ["player", "character"],
  dmg: 1,
  health: 10,
  profile: initialPlayer,
};
