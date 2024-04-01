import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pelican, world } from "~/constants.tsx";
import { applyNodeChanges, NodeChange } from "reactflow";

const initialState = [pelican, world];

export const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodeChanges: (state, action: PayloadAction<NodeChange[]>) => {
      return applyNodeChanges(action.payload, state);
    },
  },
});

export const { setNodeChanges } = nodesSlice.actions;
