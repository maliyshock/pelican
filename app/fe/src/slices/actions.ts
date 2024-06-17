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
  removeAction: (target: string) => void;
  actions: Actions;
};

export const actionsSlice = (set: SetState<Store>) => ({
  actions: {},
  setActions: (payload: ActionPayload[]) =>
    set(state => {
      const newStateActions = { ...state.actions };

      payload.forEach(ap => (newStateActions[ap.target] = { actionName: ap.actionName, source: ap.source }));

      return { ...state, actions: newStateActions };
    }),
  removeAction: (target: string) =>
    set(state => {
      const newState = { ...state.actions };

      delete newState[target];

      return newState;
    }),
});
