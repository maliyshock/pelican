import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Rarity } from "~/types";
import { EXPLORE } from "~/slices/player/explore.ts";
import { HARVEST } from "~/slices/player/harvest.ts";

interface Player {
  health: number;
  damage: number;
  weapon: null;
  craftingSpeed: number;
  attackSpeed: number;
  battleRank: number;
  calories: number;
  maxCalories: number;
  minCalories: number;
  hungerStack: number;
  speedPenaltyLevel: number;
  explore: typeof EXPLORE;
  harvest: typeof HARVEST;
}

type PlayerChange = {
  [key in keyof Player]: Player[key];
};

export type Probability = {
  [k in Rarity]: number;
};

// TODO: normalisation should be applied to rates
const initialState: Player = {
  health: 10,
  damage: 1,
  weapon: null,
  attackSpeed: 2000,
  craftingSpeed: 2000, // TODO: crafting time should calculated on items amount, player crafting speed and resource rarity
  battleRank: 0,
  calories: 1200, // 120 sec on 10 each second
  maxCalories: 3000,
  minCalories: 0, // when we hit 0 we add + 1 stack to hunger
  hungerStack: 0,
  speedPenaltyLevel: 1, // for example if it is 1.5 - it means timer goes 1.5 slower
  explore: EXPLORE,
  harvest: HARVEST,
};

export const playerSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    // find the node (target)
    // based what we have on action provide the callback
    setParameter: (state, action: PayloadAction<PlayerChange>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setParameter } = playerSlice.actions;
