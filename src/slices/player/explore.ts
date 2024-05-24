import { BASIC, COMMON, LEGENDARY, RARE, REALLY_RARE, UNIQUE } from "~/constants/dictionary.ts";

export const EXPLORE = {
  experience: 0,
  nextLevel: 50,
  speed: 1000, //15000,
  limit: 1, // how many you can select
  options: 2, // per 1 exploration
  exploreLevel: 1,
  exploreRate: {
    [BASIC]: 80,
    [COMMON]: 15,
    [RARE]: 5,
    [REALLY_RARE]: 0,
    [UNIQUE]: 0,
    [LEGENDARY]: 0,
  },
};
