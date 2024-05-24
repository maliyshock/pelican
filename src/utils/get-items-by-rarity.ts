import { RESOURCE_CONTAINERS } from "~/constants/resource-sources-map.ts";
import { EntityType, Rarity } from "~/types";
import { getRarityIndex } from "~/utils/get-rarity-index.ts";

export function getItemsByRarity(rarity: Rarity, place: EntityType) {
  // in theory it should not return undefined
  const listOfObjects = RESOURCE_CONTAINERS[place];
}
