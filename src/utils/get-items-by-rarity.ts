import { RECIPES } from "~/constants/resource-recepies.ts";
import { ObjectKeyName, Rarity } from "~/types";
import { getRarityIndex } from "~/utils/get-rarity-index.ts";

export function getItemsByRarity(rarity: Rarity, place: ObjectKeyName) {
  const listOfObjects = RECIPES[place];
  if (listOfObjects !== undefined) {
    let rarityIndex = getRarityIndex(rarity);
    // find nearest if there is no items with that rarity
    while (rarityIndex >= 0) {
      if (listOfObjects[rarityIndex] !== undefined) {
        return listOfObjects[rarityIndex];
      }
      rarityIndex--;
    }
    return;
  }
  return;
}
