import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";
import { GameNode } from "@pelican/constants";
import { NodeChange } from "@xyflow/react";

export type NodeChangesSlice = {
  changes: NodeChange<GameNode>[];
  setNodeChanges(changes: NodeChange<GameNode>[]): void;
};

export const nodeChangesSlice = (set: SetState<Store>) => ({
  changes: [],
  setNodeChanges: (changes: NodeChange<GameNode>[]) => {
    return set(state => ({
      nodeChanges: { ...state.nodeChanges, changes },
    }));
  },
});
