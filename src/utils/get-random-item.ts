import { Probability } from "~/slices/player.ts";
import { ObjectKeyName } from "~/types";
import { getRarity } from "~/utils/get-rarity.ts";
import { getRandom } from "~/utils/get-random.ts";
import { getItemsByRarity } from "~/utils/get-items-by-rarity.ts";
import { getRandomFromArray } from "~/utils/get-random-from-array.ts";

export function getRandomItem(probability: Probability, resourceName: ObjectKeyName) {
  const rarity = getRarity(probability, getRandom(100));
  const itemsByKeyAndRarity = getItemsByRarity(rarity, resourceName);

  if (itemsByKeyAndRarity === undefined) {
    // there is no such recipe message
    // TODO: this should not happen and should be covered by validation
    return undefined;
  }

  return getRandomFromArray(itemsByKeyAndRarity);
}
