import { createNode } from "./create-node.ts";
import { getBool } from "./get-bool.ts";
import { getRandomNum } from "./get-random-num.ts";

jest.mock("~/utils/get-random-num", () => ({
  getRandomNum: jest.fn(),
}));
jest.mock("~/utils/get-bool", () => ({
  getBool: jest.fn(),
}));

describe("createNode function", () => {
  const mockData = {
    roles: [RESOURCE] as Role[],
    type: TREE as EntityType,
    title: "Test Object",
  };

  beforeEach(() => {
    jest.spyOn(Date, "now").mockReturnValue(1234567890); // Mock Date.now() to a fixed value for consistent ID generation
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("creates a node with randomized position", () => {
    (getRandomNum as jest.Mock).mockReturnValue(10);
    (getBool as jest.Mock).mockReturnValueOnce(true).mockReturnValueOnce(false); // First call returns true, second call returns false

    const node = createNode({
      position: { x: 100, y: 200 },
      data: mockData,
    });

    expect(node).toEqual({
      id: "1234567890",
      data: mockData,
      position: { x: 110, y: 190 }, // x + 10, y - 10
      type: "node",
    });
  });

  test("handles different random and boolean outputs", () => {
    (getRandomNum as jest.Mock).mockReturnValue(20);
    (getBool as jest.Mock).mockReturnValueOnce(false).mockReturnValueOnce(true); // First call returns false, second call returns true

    const node = createNode({
      position: { x: 300, y: 400 },
      data: mockData,
    });

    expect(node).toEqual({
      id: "1234567890",
      data: mockData,
      position: { x: 280, y: 420 }, // x - 20, y + 20
      type: "node",
    });
  });
});
