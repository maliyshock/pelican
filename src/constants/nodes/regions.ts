import { GameNode } from "~/types";

export const FOREST: GameNode = {
  id: "forest",
  data: {
    inputs: [{ id: "world_input", name: "input", type: "input" }],
    name: "Forest",
    objectType: ["region"],
    objectKeyName: "forest",
    img: { src: "/assets/forest.jpg", alt: "forest" },
    grabbable: true,
  },
  position: { x: 100, y: 100 },
  type: "node",
};
