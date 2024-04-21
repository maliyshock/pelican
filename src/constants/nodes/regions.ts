import { GameNode } from "~/types";
import { FOREST } from "~/constants/dictionary.ts";

export const FOREST_OBJECT: GameNode = {
  id: FOREST,
  data: {
    price: 3,
    inputs: [{ id: "world_input", name: "input", type: "input" }],
    name: "Forest",
    objectType: ["region"],
    objectKeyName: FOREST,
    img: { src: "/assets/forest.jpg", alt: FOREST },
    grabbable: true,
    health: 3,
  },
  position: { x: 100, y: 100 },
  type: "node",
};
