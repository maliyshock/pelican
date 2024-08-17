import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";

export type TalkSlice = {
  companionId?: string;
  setTalk: (id?: string) => void;
};

export const talkSlice = (set: SetState<Store>) => ({
  companionId: undefined,
  setTalk: (id?: string) =>
    set(store => ({
      talk: {
        ...store.talk,
        companionId: id,
      },
    })),
});
