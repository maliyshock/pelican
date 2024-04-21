import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const moneySlice = createSlice({
  name: "money",
  initialState: 0,
  reducers: {
    addMoney: (state, action: PayloadAction<number>) => {
      return state + action.payload;
    },
    removeMoney: (state, action: PayloadAction<number>) => {
      return state - action.payload;
    },
  },
});

export const { addMoney, removeMoney } = moneySlice.actions;
