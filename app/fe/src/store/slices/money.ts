import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";

export type MoneySlice = {
  value: number;
  addMoney: (amount: number) => void;
  removeMoney: (amount: number) => void;
};

export const moneySlice = (set: SetState<Store>) => ({
  value: 0,
  addMoney: (amount: number) =>
    set(state => ({
      ...state,
      money: {
        ...state.money,
        value: state.money.value + amount,
      },
    })),
  removeMoney: (amount: number) =>
    set(state => ({
      ...state,
      money: {
        ...state.money,
        value: state.money.value - amount,
      },
    })),
});
