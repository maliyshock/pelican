import { groupNodesByKey } from "~/utils/group-nodes-by-key.ts";
import { FOOD, POOP, RESOURCE, STONE, WOOD } from "~/constants/dictionary.ts";

describe("groupNodesByKey with Resource Deposits and Resources", () => {
  const initAcc = {};

  test("aggregates nodes based on Resource Deposit types and Resource key names", () => {
    const nodes = [
      {
        id: "poop_id_1",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          objectType: [FOOD, RESOURCE],
          objectKeyName: POOP,
        },
      },
      {
        id: "wood_id_1",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          objectType: [RESOURCE],
          objectKeyName: WOOD,
        },
      },
      {
        id: "stone_id_1",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          objectType: [RESOURCE],
          objectKeyName: STONE,
        },
      },
    ];

    const expected = {
      [FOOD]: {
        [POOP]: 1,
      },
      [RESOURCE]: {
        [POOP]: 1,
        [WOOD]: 1,
        [STONE]: 1,
      },
    };

    expect(groupNodesByKey({ nodes, initAcc })).toEqual(expected);
  });
});
