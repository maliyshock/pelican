import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASIC, COMMON, LEGENDARY, RARE, Rarity, REALLY_RARE, UNIQUE } from "~/constants/resource-recepies.ts";

interface Player {
  attackSpeed: number;
  health: number;
  damage: number;
  weapon: null;
  exploreSpeed: number;
  battleRank: number;
  experience: number;
  nextLevel: number;
  exploreRate: Probability;
}

type PlayerChange = {
  [key in keyof Player]: Player[key];
};

export type Probability = {
  [k in Rarity]: number;
};

const initialState: Player = {
  attackSpeed: 2000,
  health: 10,
  damage: 1,
  weapon: null,
  exploreSpeed: 15000,
  battleRank: 0,
  experience: 0,
  nextLevel: 50,
  exploreRate: {
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
