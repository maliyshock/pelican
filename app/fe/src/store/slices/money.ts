import { SetState } from "zustand";
import { Store } from "~/store/use-store.ts";

export type MoneySlice = {
  value: number;
  addMoney: (amount: number) => void;
  removeMoney: (amount: number) => void;
};

export const moneySlice = (set: SetState<Store>) => {
  const updateMoney = (updater: (currentValue: number) => number) =>
    set(state => ({
      money: {
        ...state.money,
        value: updater(state.money.value),
      },
    }));

  return {
    value: 0,
    addMoney: (amount: number) => updateMoney(value => value + amount),
    removeMoney: (amount: number) => updateMoney(value => value - amount),
  };
};
