import { ActionKind } from "@pelican/constants";
import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";

// one specific action between source and target per time
export type ActionPayload = {
  target: string;
  source: string;
  actionName: ActionKind;
};

export type Action = {
  source: string;
  actionName: ActionKind;
};

export type Actions = {
  [target: string]: Action;
};

export type ActionsSlice = {
  setActions: (payload: ActionPayload[]) => void;
  deleteActions: (targets: string[]) => void;
  items: Actions;
};

export const actionsSlice = (set: SetState<Store>) => ({
  items: {},
  setActions: (payload: ActionPayload[]) =>
    set(state => {
      const newState = {
        actions: {
          ...state.actions,
          items: {
            ...state.actions.items,
          },
        },
      };

      payload.forEach(ap => (newState.actions.items[ap.target] = { actionName: ap.actionName, source: ap.source }));

      return newState;
    }),
  deleteActions: (targets: string[]) =>
    set(state => {
      const newState = {
        actions: {
          ...state.actions,
          items: {
            ...state.actions.items,
          },
        },
      };

      targets.forEach(tr => delete newState.actions.items[tr]);

      return newState;
    }),
});
