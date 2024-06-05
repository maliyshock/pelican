import { getRarityIndex } from "./get-rarity-index.ts";

describe("getRarityIndex", () => {
  it('returns correct index for "basic"', () => {
    expect(getRarityIndex("basic")).toBe(0);
  });

  it('returns correct index for "common"', () => {
    expect(getRarityIndex("common")).toBe(1);
  });

  it('returns correct index for "unique"', () => {
    expect(getRarityIndex("unique")).toBe(2);
  });

  it('returns correct index for "rare"', () => {
    expect(getRarityIndex("rare")).toBe(3);
  });

  it('returns correct index for "really-really-rare"', () => {
    expect(getRarityIndex("really-really-rare")).toBe(4);
  });

  it('returns correct index for "legendary"', () => {
    expect(getRarityIndex("legendary")).toBe(5);
  });
});
