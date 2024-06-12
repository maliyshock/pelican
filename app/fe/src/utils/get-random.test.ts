import { getRandomNum } from "./get-random-num.ts";

describe("getRandom function", () => {
  beforeEach(() => {
    jest.spyOn(Math, "random");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns 0 when Math.random returns 0", () => {
    (Math.random as jest.Mock).mockReturnValue(0);
    expect(getRandomNum(100)).toBe(0);
  });

  test("returns max when Math.random returns almost 1", () => {
    (Math.random as jest.Mock).mockReturnValue(0.999999);
    expect(getRandomNum(100)).toBe(100);
  });

  test("returns a rounded number based on the random output and max value", () => {
    (Math.random as jest.Mock).mockReturnValue(0.123456);
    expect(getRandomNum(100)).toBe(12);
  });

  test("correctly handles a max value of 0", () => {
    (Math.random as jest.Mock).mockReturnValue(0.5);
    expect(getRandomNum(0)).toBe(0);
  });

  test("handles large max values", () => {
    (Math.random as jest.Mock).mockReturnValue(0.6789);
    expect(getRandomNum(1000)).toBe(679);
  });
});
