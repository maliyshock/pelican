import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GameNode } from "~/types";
import { INIT_NODES } from "~/constants/constants.ts";
import { groupNodesByKey } from "~/utils/group-nodes-by-key.ts";

// this slice does not regulate state of react flow, it is an utility to track some useful data
export const nodesCounterSlice = createSlice({
  name: "nodesCounter",
  initialState: groupNodesByKey({ nodes: INIT_NODES, initAcc: {} }),
  reducers: {
    add: (state, action: PayloadAction<GameNode[]>) => {
      return groupNodesByKey({ nodes: action.payload, initAcc: state });
    },
    remove: (state, action: PayloadAction<GameNode[]>) => {
      return groupNodesByKey({ nodes: action.payload, initAcc: state, step: -1 });
    },
  },
});

export const { add, remove } = nodesCounterSlice.actions;
