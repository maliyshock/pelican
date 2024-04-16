import { Rarity, Region, RESOURCE_RECIPES } from "~/constants/resource-recepies.ts";

export function getItemsByRarity(rarity: Rarity, region: Region) {
  return RESOURCE_RECIPES[region][rarity];
}
