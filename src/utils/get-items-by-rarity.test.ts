import { getItemsByRarity } from "~/utils/get-items-by-rarity.ts";
import { RESOURCE_NODES } from "~/constants/resource-recepies.ts";
import { BASIC, COMMON, FOREST, RARE, TREE } from "~/constants/dictionary.ts";

describe("getItemsByRarity", () => {
  it("returns items for a given rarity and place when items are available", () => {
    expect(getItemsByRarity(COMMON, FOREST)).toEqual(RESOURCE_NODES[FOREST]![1]);
    expect(getItemsByRarity(RARE, FOREST)).toEqual(RESOURCE_NODES[FOREST]![2]);
    expect(getItemsByRarity(BASIC, TREE)).toEqual(RESOURCE_NODES[TREE]![0]);
  });

  it("returns nearest lower rarity items when requested rarity is not available", () => {
    expect(getItemsByRarity(RARE, TREE)).toEqual(RESOURCE_NODES[TREE]![2]);
  });
});
