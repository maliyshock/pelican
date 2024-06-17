import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";

export type ModalStatusSlice = {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
};

export const modalStatusSlice = (set: SetState<Store>) => ({
  isOpen: false,
  setIsOpen: (status: boolean) =>
    set(state => ({
      ...state,
      modal: {
        ...state.modal,
        isOpen: status,
      },
    })),
});
