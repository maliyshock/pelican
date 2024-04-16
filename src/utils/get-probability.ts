import { Probability } from "~/slices/player.ts";
import { Rarity } from "~/types";

export function getRarity(probabilityChances: Probability, number: number): Rarity | undefined {
  let prevSum = 0;

  for (const k in probabilityChances) {
    if (number < prevSum + probabilityChances[k as keyof Probability]) {
      return k as Rarity;
    }
    prevSum += probabilityChances[k as keyof Probability];
  }
}
