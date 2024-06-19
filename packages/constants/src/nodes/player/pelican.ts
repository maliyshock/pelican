import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";
import { HARVEST } from "~/nodes/player/harvest";
import { EXPLORE } from "~/nodes/player/explore";
import { DIGESTION } from "~/nodes/player/digestion";

export type Digestion = typeof DIGESTION;

export interface Profile {
  weapon: null;
  craftingSpeed: number;
  attackSpeed: number;
  battleRank: number;
  speedPenaltyLevel: number;
  explore: typeof EXPLORE;
  harvest: typeof HARVEST;
  digestion: Digestion;
}

const initialPlayer: Profile = {
  weapon: null,
  attackSpeed: 2000,
  craftingSpeed: 2000, // TODO: crafting time should calculated on items amount, player crafting speed and resource rarity
  battleRank: 0,
  digestion: DIGESTION,
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
  maxHealth: 10,
  profile: initialPlayer,
};
