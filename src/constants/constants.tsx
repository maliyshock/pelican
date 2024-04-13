import { GameNode } from "~/types";

export const PELICAN: GameNode = {
  id: "player",
  data: {
    inputs: [{ id: "player_input", name: "input", type: "input" }],
    outputs: [{ id: "player_output", name: "output", type: "output" }],
    img: { src: "/assets/pelican.jpg", alt: "pelican" },
    dmg: 1,
    health: 10,
    objectType: "player",
    grabbable: true,
  },
  position: { x: 0, y: 0 },
  type: "node",
};

export const WORLD: GameNode = {
  id: "world",
  data: {
    inputs: [{ id: "world_input", name: "input", type: "input" }],
    name: "World",
    objectType: "world",
    grabbable: true,
  },
  position: { x: 100, y: 100 },
  type: "node",
};

export const INIT_NODES = [PELICAN, WORLD];

export const APPEARANCE_RANGE = 200;
