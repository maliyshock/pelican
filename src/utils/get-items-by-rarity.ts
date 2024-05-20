import { RESOURCE_CONTAINERS } from "~/constants/resource-sources-map.ts";
import { EntityType, Rarity } from "~/types";
import { getRarityIndex } from "~/utils/get-rarity-index.ts";

export function getItemsByRarity(rarity: Rarity, place: EntityType) {
  // in theory it should not return undefined
  const listOfObjects = RESOURCE_CONTAINERS[place];

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

  // it will return undefined if there is no list of objects or we did not get rarity index
  return;
}
