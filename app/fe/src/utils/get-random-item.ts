// import { getRandom } from "./get-random.ts";
//
// import { getRandomFromArray } from "./get-random-from-array.ts";
//
// export function getRandomItem(probability: Probability, resourceName: EntityType) {
//   const rarity = getRarity(probability, getRandom(100));
//
//   // const itemsByKeyAndRarity = getItemsByRarity(rarity, resourceName);
//
//   if (itemsByKeyAndRarity === undefined || itemsByKeyAndRarity.length === 0) {
//     // there is no such recipe message
//     // TODO: this should not happen and should be covered by validation
//     return undefined;
//   }
//
//   const result = getRandomFromArray(itemsByKeyAndRarity);
//
//   if (result === undefined) {
//   }
//
//   return result;
// }
