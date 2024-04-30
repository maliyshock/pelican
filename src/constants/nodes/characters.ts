import { GameNode } from "~/types";
import { CHARACTER, FOX, PELICAN, PLAYER } from "~/constants/dictionary.ts";

export const PELICAN_OBJECT: GameNode = {
  id: PLAYER,
  data: {
    inputs: [{ id: "player_input", name: "input" }],
    outputs: [{ id: "player_output", name: "output" }],
    img: { src: "/assets/pelican.jpg", alt: PELICAN },
    dmg: 1,
    health: 10,
    name: "George",
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
    inputs: [{ id: "input", name: "input" }],
    outputs: [{ id: "output", name: "output" }],
    img: { src: "", alt: FOX },
    dmg: 15,
    health: 35,
    name: "Fox",
    objectKeyName: FOX,
    objectType: [CHARACTER],
  },
  position: { x: 300, y: 300 },
  type: "node",
};
