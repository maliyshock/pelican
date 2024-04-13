import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Player {
  attackSpeed: number;
  health: number;
  damage: number;
  weapon: null;
  exploreSpeed: number;
  battleRank: number;
  experience: number;
  nextLevel: number;
  exploreRate: {
    regular: number;
    unique: number;
    rare: number;
    legendary: number;
  };
}

type PlayerChange = {
  [key in keyof Player]: Player[key];
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
    regular: 100,
    unique: 0,
    rare: 0,
    legendary: 0,
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
