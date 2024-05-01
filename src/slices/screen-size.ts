import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Size = {
  width?: number;
  height?: number;
};

const initialState: Size = {
  width: undefined,
  height: undefined,
};

export const screenSizeSlice = createSlice({
  name: "screenSize",
  initialState,
  reducers: {
    setScreenSize: (state, action: PayloadAction<Size>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setScreenSize } = screenSizeSlice.actions;
