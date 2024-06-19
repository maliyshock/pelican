import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";

export type MoneySlice = {
  money: number;
  addMoney: (amount: number) => void;
  removeMoney: (amount: number) => void;
};

export const moneySlice = (set: SetState<Store>) => ({
  money: 0,
  addMoney: (amount: number) =>
    set(state => ({
      money: state.money + amount,
    })),
  removeMoney: (amount: number) =>
    set(state => ({
      money: state.money - amount,
    })),
});
