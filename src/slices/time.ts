import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  speed: number;
  play: boolean;
} = {
  speed: 1,
  play: true,
};
export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    pause: state => {
      state.play = false;
    },
    play: state => {
      state.play = true;
    },
  },
});

export const { pause, play } = timeSlice.actions;
