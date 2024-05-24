import { Probability } from "~/slices/player/player.ts";
import { EntityType } from "~/types";
import { getRarity } from "~/utils/get-rarity.ts";
import { getRandom } from "~/utils/get-random.ts";
import { getItemsByRarity } from "~/utils/get-items-by-rarity.ts";
import { getRandomFromArray } from "~/utils/get-random-from-array.ts";

export function getRandomItem(probability: Probability, resourceName: EntityType) {
  const rarity = getRarity(probability, getRandom(100));

  // const itemsByKeyAndRarity = getItemsByRarity(rarity, resourceName);

  if (itemsByKeyAndRarity === undefined || itemsByKeyAndRarity.length === 0) {
    // there is no such recipe message
    // TODO: this should not happen and should be covered by validation
    return undefined;
  }

  const result = getRandomFromArray(itemsByKeyAndRarity);

  if (result === undefined) {
  }

  return result;
}
