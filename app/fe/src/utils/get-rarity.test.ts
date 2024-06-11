describe("getRarity function", () => {
  const probabilities = {
    [BASIC]: 20,
    [COMMON]: 30,
    [UNIQUE]: 15,
    [RARE]: 20,
    [REALLY_RARE]: 10,
    [LEGENDARY]: 5,
  };

  test("returns BASIC for numbers within the basic range", () => {
    expect(getRarity(probabilities, 0)).toBe(BASIC);
    expect(getRarity(probabilities, 20)).toBe(BASIC);
  });

  test("returns COMMON for numbers within the common range", () => {
    expect(getRarity(probabilities, 21)).toBe(COMMON);
    expect(getRarity(probabilities, 50)).toBe(COMMON);
  });

  test("returns UNIQUE for numbers within the unique range", () => {
    expect(getRarity(probabilities, 51)).toBe(UNIQUE);
    expect(getRarity(probabilities, 65)).toBe(UNIQUE);
  });

  test("returns RARE for numbers within the rare range", () => {
    expect(getRarity(probabilities, 66)).toBe(RARE);
    expect(getRarity(probabilities, 85)).toBe(RARE);
  });

  test("returns REALLY_RARE for numbers within the rare range", () => {
    expect(getRarity(probabilities, 86)).toBe(REALLY_RARE);
    expect(getRarity(probabilities, 95)).toBe(REALLY_RARE);
  });

  test("returns LEGENDARY for numbers within the rare range", () => {
    expect(getRarity(probabilities, 96)).toBe(LEGENDARY);
    expect(getRarity(probabilities, 100)).toBe(LEGENDARY);
  });
});
