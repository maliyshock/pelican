import { Rarity } from "../../../common/src/types";
const rarityMap = {
  "basic": 0,
  "common": 1,
  "rare": 2,
  "really-really-rare": 3,
  "unique": 4,
  "legendary": 5,
};

export function getRarityIndex(rarity: Rarity) {
  return rarityMap[rarity];
}
