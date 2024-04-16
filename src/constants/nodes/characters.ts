import { GameNode } from "~/types";

export const PELICAN: GameNode = {
  id: "player",
  data: {
    inputs: [{ id: "player_input", name: "input", type: "input" }],
    outputs: [{ id: "player_output", name: "output", type: "output" }],
    img: { src: "/assets/pelican.jpg", alt: "pelican" },
    dmg: 1,
    health: 10,
    objectKeyName: "player",
    objectType: ["player"],
    grabbable: true,
  },
  position: { x: 0, y: 0 },
  type: "node",
};
