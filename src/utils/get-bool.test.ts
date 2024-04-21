import { getRandom } from "~/utils/get-random.ts";
import { getBool } from "~/utils/get-bool.ts";
jest.mock("~/utils/get-random", () => ({
  getRandom: jest.fn(),
}));
describe("getBool function", () => {
  test("returns true when getRandom(1) returns 1", () => {
    (getRandom as jest.Mock).mockReturnValue(1);
    expect(getBool()).toBe(true);
  });

  test("returns false when getRandom(1) returns 0", () => {
    (getRandom as jest.Mock).mockReturnValue(0);
    expect(getBool()).toBe(false);
  });
});
