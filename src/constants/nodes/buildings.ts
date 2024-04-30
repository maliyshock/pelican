import { GameNode } from "~/types";
import { BUILDING, STONE, WOOD } from "~/constants/dictionary.ts";

export const TEST_STRUCTURE_OBJECT: GameNode = {
  id: "test_structure",
  data: {
    inputs: [{ id: "player_input", name: "input", type: WOOD }],
    outputs: [{ id: "player_output", name: "output", type: STONE }],
    img: { src: "/assets/pelican.jpg", alt: "pelican" },
    dmg: 1,
    health: 10,
    objectKeyName: BUILDING,
    objectType: [BUILDING],
  },
  position: { x: 0, y: 0 },
  type: "node",
};
