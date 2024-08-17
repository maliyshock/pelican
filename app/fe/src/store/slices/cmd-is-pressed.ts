import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";

export type CmdSlice = {
  cmdIsPressed: boolean;
  setCmdIsPressed: (isPressed: boolean) => void;
};

export const cmdSlice = (set: SetState<Store>) => ({
  cmdIsPressed: false,
  setCmdIsPressed: (isPressed: boolean) =>
    set(state => ({
      cmd: {
        ...state.cmd,
        cmdIsPressed: isPressed,
      },
    })),
});
