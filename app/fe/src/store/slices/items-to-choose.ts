import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";
import { GameNodeData } from "@pelican/constants";

interface SetItems {
  items: GameNodeData[];
  actor?: string;
}

export type ItemsToChooseSlice = {
  items: GameNodeData[];
  actor?: string;
  setItems: ({ items, actor }: SetItems) => void;
};

const initialState: GameNodeData[] = [];

export const itemsToChooseSlice = (set: SetState<Store>) => ({
  items: initialState,
  actor: "",
  setItems: ({ items, actor }: SetItems) =>
    set(state => ({
      ...state,
      choice: {
        ...state.choice,
        items,
        actor: actor || undefined,
      },
    })),
});
