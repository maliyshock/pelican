import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// one specific action between source and target per time
export type Payload = {
  target: string;
  actionName: string;
};

const initialState: { [key: string]: string } = {};
export const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    setAction: (state, action: PayloadAction<Payload>) => {
      const { target, actionName } = action.payload;

      state[target] = actionName;
    },
  },
});

export const { setAction } = actionsSlice.actions;
