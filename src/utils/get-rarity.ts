import { Probability } from "~/slices/player.ts";
import { Rarity } from "~/types";
import { BASIC } from "~/constants/dictionary.ts";

export function getRarity(probabilityChances: Probability, number: number): Rarity {
  let prevSum = 0;
  let result: Rarity = BASIC;

  for (const k in probabilityChances) {
    if (number <= prevSum + probabilityChances[k as keyof Probability]) {
      return k as Rarity;
    }

    prevSum += probabilityChances[k as keyof Probability];
  }

  return result;
}