import { formatTime } from "./format-time.ts";

describe("formatTime function", () => {
  test("formats single-digit numbers with a leading zero", () => {
    expect(formatTime(1)).toBe("01");
    expect(formatTime(0)).toBe("00");
    expect(formatTime(9)).toBe("09");
  });

  test("keeps double-digit numbers unchanged", () => {
    expect(formatTime(10)).toBe("10");
    expect(formatTime(99)).toBe("99");
  });

  test("handles negative numbers correctly", () => {
    expect(formatTime(-1)).toBe("-01");
    expect(formatTime(-9)).toBe("-09");
    expect(formatTime(-10)).toBe("-10");
  });

  test("formats large numbers without grouping", () => {
    expect(formatTime(100)).toBe("100");
    expect(formatTime(1000)).toBe("1000");
  });
});
