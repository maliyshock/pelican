import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameNodeData } from "~/types";

const initialState: { items: GameNodeData[] } = {
  items: [],
};

export const itemsToChooseSlice = createSlice({
  name: "itemsToChoose",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<GameNodeData[]>) => {
      state.items = action.payload;
    },
    clear: state => {
      state.items = [];
    },
  },
});

export const { setItems, clear } = itemsToChooseSlice.actions;
