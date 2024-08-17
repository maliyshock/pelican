import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";

export type PlayerSubscriptions = {
  items: Map<string, string>;
  add: (playerId: string, nodeId: string) => void;
  remove: (playerId: string) => void;
};

export const playerSubscriptionSlice = (set: SetState<Store>) => {
  return {
    items: new Map(),
    add: (playerId: string, nodeId: string) => {
      set(state => {
        const newItems = new Map(state.playerSubscription.items);

        newItems.set(playerId, nodeId);

        return {
          playerSubscription: {
            ...state.playerSubscription,
            items: newItems,
          },
        };
      });
    },
    remove: (playerId: string) => {
      set(state => {
        const newItems = new Map(state.playerSubscription.items);

        newItems.delete(playerId);

        return {
          playerSubscription: {
            ...state.playerSubscription,
            items: newItems,
          },
        };
      });
    },
  };
};
