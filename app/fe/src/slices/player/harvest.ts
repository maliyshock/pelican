import { BASIC, COMMON, LEGENDARY, RARE, REALLY_RARE, UNIQUE } from "../../../../common/src/constants/dictionary.ts";

export const HARVEST = {
  speed: 1000, //15000,
  harvestLevel: 1,
  harvestRate: {
    [BASIC]: 80,
    [COMMON]: 15,
    [RARE]: 5,
    [REALLY_RARE]: 0,
    [UNIQUE]: 0,
    [LEGENDARY]: 0,
  },
};
