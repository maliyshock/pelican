import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Rarity } from "~/types";
import { BASIC, COMMON, LEGENDARY, RARE, REALLY_RARE, UNIQUE } from "~/constants/dictionary.ts";

interface Player {
  health: number;
  damage: number;
  weapon: null;
  exploreSpeed: number;
  harvestSpeed: number;
  attackSpeed: number;
  battleRank: number;
  experience: number;
  nextLevel: number;
  calories: number;
  maxCalories: number;
  minCalories: number;
  hungerStack: number;
  speedPenaltyLevel: number;
  exploreRate: Probability;
  harvestRate: Probability;
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
  exploreSpeed: 1000, //15000
  harvestSpeed: 1000, // 7000
  attackSpeed: 2000,
  battleRank: 0,
  experience: 0,
  nextLevel: 50,
  calories: 1200, // 120 sec on 10 each second
  maxCalories: 3000,
  minCalories: 0, // when we hit 0 we add + 1 stack to hunger
  hungerStack: 0,
  speedPenaltyLevel: 1, // for example if it is 1.5 - it means timer goes 1.5 slower
  exploreRate: {
    [BASIC]: 80,
    [COMMON]: 20,
    [UNIQUE]: 0,
    [RARE]: 0,
    [REALLY_RARE]: 0,
    [LEGENDARY]: 0,
  },
  harvestRate: {
    [BASIC]: 80,
    [COMMON]: 20,
    [UNIQUE]: 0,
    [RARE]: 0,
    [REALLY_RARE]: 0,
    [LEGENDARY]: 0,
  },
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
