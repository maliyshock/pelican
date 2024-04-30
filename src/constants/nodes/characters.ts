import { GameNode } from "~/types";
import { CHARACTER, FOX, PELICAN, PLAYER } from "~/constants/dictionary.ts";

export const PELICAN_OBJECT: GameNode = {
  id: PLAYER,
  data: {
    inputs: [{ id: "player_input", name: "input", type: "input" }],
    outputs: [{ id: "player_output", name: "output", type: "output" }],
    img: { src: "/assets/pelican.jpg", alt: "pelican" },
    dmg: 1,
    health: 10,
    objectKeyName: PELICAN,
    objectType: [PLAYER],
  },
  position: { x: 0, y: 0 },
  type: "node",
};

export const FOX_OBJECT: GameNode = {
  id: "fox",
  dragHandle: `.this .handler .should .never .exist .for .character .type ._${Date.now()}`,
  data: {
    inputs: [{ id: "input", name: "input", type: "input" }],
    outputs: [{ id: "output", name: "output", type: "output" }],
    img: { src: "", alt: "fox" },
    dmg: 15,
    health: 35,
    objectKeyName: FOX,
    objectType: [CHARACTER],
    name: "Fox",
  },
  position: { x: 300, y: 300 },
  type: "node",
};
