import { getRandomNum } from "./get-random-num.ts";
import { getBool } from "./get-bool.ts";
jest.mock("~/utils/get-random", () => ({
  getRandom: jest.fn(),
}));
describe("getBool function", () => {
  test("returns true when getRandom(1) returns 1", () => {
    (getRandomNum as jest.Mock).mockReturnValue(1);
    expect(getBool()).toBe(true);
  });

  test("returns false when getRandom(1) returns 0", () => {
    (getRandomNum as jest.Mock).mockReturnValue(0);
    expect(getBool()).toBe(false);
  });
});
