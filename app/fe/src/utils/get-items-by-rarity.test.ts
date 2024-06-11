describe("getItemsByRarity", () => {
  it("returns items for a given rarity and place when items are available", () => {
    expect(getItemsByRarity(COMMON, FOREST)).toEqual(RESOURCE_CONTAINERS[FOREST]![1]);
    expect(getItemsByRarity(RARE, FOREST)).toEqual(RESOURCE_CONTAINERS[FOREST]![2]);
    expect(getItemsByRarity(BASIC, TREE)).toEqual(RESOURCE_CONTAINERS[TREE]![0]);
  });

  it("returns nearest lower rarity items when requested rarity is not available", () => {
    expect(getItemsByRarity(RARE, TREE)).toEqual(RESOURCE_CONTAINERS[TREE]![2]);
  });
});
