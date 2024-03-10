import { generateRandomString } from "./common.ts";

describe("generateRandomString", () => {
  test("should generate a string of correct length", () => {
    const length = 10;
    const result = generateRandomString(length);

    expect(result).toHaveLength(length);
  });
});
