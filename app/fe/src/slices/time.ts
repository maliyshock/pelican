import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";

export type TimeSlice = {
  speed: number;
  play: boolean;
  setPlay: (payload: boolean) => void;
};

const initialState = {
  speed: 1,
  play: true,
};

export const timeSlice = (set: SetState<Store>) => ({
  ...initialState,
  setPlay: (payload: boolean) => set(state => ({ ...state, play: payload })),
});
