import { Rarity } from "~/types";
const rarityMap = {
  "basic": 0,
  "common": 1,
  "unique": 2,
  "rare": 3,
  "really-really-rare": 4,
  "legendary": 5,
};
export function getRarityIndex(rarity: Rarity) {
  return rarityMap[rarity];
}
