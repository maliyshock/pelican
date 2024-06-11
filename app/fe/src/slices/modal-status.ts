import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const modalStatusSlice = createSlice({
  name: "modals-status",
  initialState: {
    isOpen: false,
  },
  reducers: {
    modalStatus: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { modalStatus } = modalStatusSlice.actions;
