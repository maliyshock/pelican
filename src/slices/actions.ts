import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// one specific action between source and target per time
export type SetActionPayload = {
  target: string;
  actionName: string;
};

const initialState: { [key: string]: string } = {};

export const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    setAction: (state, action: PayloadAction<SetActionPayload>) => {
      const { target, actionName } = action.payload;

      state[target] = actionName;
    },
    removeAction: (state, action: PayloadAction<{ target: string }>) => {
      delete state[action.payload.target];
    },
  },
});

export const { setAction, removeAction } = actionsSlice.actions;
