import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";

export type Size = {
  width?: number;
  height?: number;
};

export type ScreenSizeSlice = {
  screenSize: Size;
  setScreenSize: (size: Size) => void;
};

const initialState: Size = {
  width: undefined,
  height: undefined,
};

export const screenSizeSlice = (set: SetState<Store>) => ({
  screenSize: initialState,
  setScreenSize: (size: Size) =>
    set(state => ({
      screenSize: { ...state.screenSize, ...size },
    })),
});
