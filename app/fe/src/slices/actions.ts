import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// one specific action between source and target per time
export type SetActionsPayload = {
  target: string;
  actionName: string;
};

const initialState: { [key: string]: string } = {};

export const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    setActions: (state, action: PayloadAction<SetActionsPayload[]>) => {
      action.payload.forEach(action => (state[action.target] = action.actionName));
    },
    removeAction: (state, action: PayloadAction<{ target: string }>) => {
      delete state[action.payload.target];
    },
  },
});

export const { setActions, removeAction } = actionsSlice.actions;
