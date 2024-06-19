import { groupNodesByKey } from "./group-node-ids-by-role.ts";
import { FOOD, POOP, RESOURCE, STONE, WOOD } from "../../../common/src/constants/dictionary.ts";
import { GameNode } from "../../../common/src/types";

describe("groupNodesByKey with Resource Deposits and Resources", () => {
  const initAcc = {};

  test("aggregates nodes based on Resource Deposit types and Resource key names", () => {
    const nodes: GameNode[] = [
      {
        id: "poop_id_1",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          roles: [FOOD, RESOURCE],
          type: POOP,
        },
      },
      {
        id: "wood_id_1",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          roles: [RESOURCE],
          type: WOOD,
        },
      },
      {
        id: "stone_id_1",
        position: {
          x: 0,
          y: 0,
        },
        data: {
          roles: [RESOURCE],
          type: STONE,
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
