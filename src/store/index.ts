import { configureStore } from "@reduxjs/toolkit";
import { screenSizeSlice } from "../slices/screen-size.ts";
import { nodesSlice } from "~/slices/nodes.ts";
import { edgesSlice } from "~/slices/edges.ts";

export const store = configureStore({
  reducer: {
    screenSize: screenSizeSlice.reducer,
    nodes: nodesSlice.reducer,
    edges: edgesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
