import { configureStore } from "@reduxjs/toolkit";
import { screenSizeSlice } from "../slices/screen-size.ts";

export const store = configureStore({
  reducer: {
    screenSize: screenSizeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
