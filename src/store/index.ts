import { configureStore } from "@reduxjs/toolkit";
import { screenSizeSlice } from "../slices/screen-size.ts";
import { actionsSlice } from "~/slices/actions.ts";
import { playerSlice } from "~/slices/player.ts";
import { timeSlice } from "~/slices/time.ts";

export const store = configureStore({
  reducer: {
    screenSize: screenSizeSlice.reducer,
    actions: actionsSlice.reducer,
    player: playerSlice.reducer,
    time: timeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
