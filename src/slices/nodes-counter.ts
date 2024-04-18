import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameNode } from "~/types";
import { INIT_NODES } from "~/constants/constants.tsx";
import { groupNodesByKey } from "~/utils/group-nodes-by-key.ts";

// this slice does not regulate state of react flow, it is an utility to track some useful data
export const nodesCounterSlice = createSlice({
  name: "nodes",
  initialState: groupNodesByKey({ nodes: INIT_NODES, initAcc: {} }),
  reducers: {
    add: (state, action: PayloadAction<GameNode[]>) => {
      state = groupNodesByKey({ nodes: action.payload, initAcc: state });
    },
  },
});

export const { add } = nodesCounterSlice.actions;
