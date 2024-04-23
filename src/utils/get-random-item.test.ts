import { getRandomItem } from "~/utils/get-random-item.ts";
import { FOREST } from "~/constants/dictionary.ts";

describe("Integration Test for getRandomItem", () => {
  test("retrieves a random item based on rarity and keyName", async () => {
    const probability = {
      "basic": 50,
      "common": 20,
      "unique": 20,
      "rare": 5,
      "really-really-rare": 4,
      "legendary": 1,
    };

    // Execute the function to test
    const item = getRandomItem(probability, FOREST);

    expect(item).toBeDefined();
    expect(typeof item).toBe("object");
    expect(item).toHaveProperty("name");
    expect(item).toHaveProperty("rarity");
    expect(["basic", "common", "unique", "rare", "really-really-rare", "legendary"]).toContain(item!.rarity); // Check if the returned item's rarity is valid
  });
});
