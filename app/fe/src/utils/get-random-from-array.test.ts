import { getRandomNum } from "./get-random-num.ts";
import { getRandomFromArray } from "./get-random-from-array.ts";

jest.mock("~/utils/get-random-num", () => ({
  getRandomNum: jest.fn(),
}));

describe("getRandomFromArray function", () => {
  test("returns the correct element from the array", () => {
    const testArray = ["a", "b", "c", "d", "e"];

    (getRandomNum as jest.Mock).mockReturnValue(2); // Mock getRandom to return the index 2
    expect(getRandomFromArray(testArray)).toBe("c");
  });

  test("returns the first element when getRandom returns 0", () => {
    const testArray = [10, 20, 30];

    (getRandomNum as jest.Mock).mockReturnValue(0); // Mock getRandom to return the index 0
    expect(getRandomFromArray(testArray)).toBe(10);
  });

  test("returns the last element when getRandom returns the last index", () => {
    const testArray = [10, 20, 30];

    (getRandomNum as jest.Mock).mockReturnValue(2); // Mock getRandom to return the index 2, which is the last index in the array
    expect(getRandomFromArray(testArray)).toBe(30);
  });

  test("handles empty arrays by returning undefined", () => {
    const testArray: any[] = [];

    expect(getRandomFromArray(testArray)).toBeUndefined();
  });
});
