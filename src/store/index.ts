import { configureStore } from "@reduxjs/toolkit";
import { screenSizeSlice } from "../slices/screen-size.ts";
import { actionsSlice } from "~/slices/actions.ts";
import { playerSlice } from "~/slices/player.ts";

export const store = configureStore({
  reducer: {
    screenSize: screenSizeSlice.reducer,
    // nodes: nodesSlice.reducer,
    // edges: edgesSlice.reducer,
    actions: actionsSlice.reducer,
    player: playerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
