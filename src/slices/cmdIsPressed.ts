import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const cmdSlice = createSlice({
  name: "cmd",
  initialState: false,
  reducers: {
    cmdIsPressed: (_, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { cmdIsPressed } = cmdSlice.actions;
