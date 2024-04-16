import { GameObject } from "~/types";

export const BASIC = "basic";
export const COMMON = "common";
export const UNIQUE = "unique";
export const RARE = "rare";
export const REALLY_RARE = "really-really-rare";
export const LEGENDARY = "legendary";

export type Rarity = typeof BASIC | typeof COMMON | typeof UNIQUE | typeof RARE | typeof REALLY_RARE | typeof LEGENDARY;

export const FOREST = "forest";
export type Region = typeof FOREST;

const TREE: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Tree",
  health: 3,
  objectType: "resource",
  grabbable: true,
  img: { src: "/assets/tree.jpg", alt: "tree" },
  rarity: BASIC,
};

const ROCK: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Rock",
  health: 3,
  objectType: "resource",
  grabbable: true,
  img: { src: "", alt: "rock" },
  rarity: BASIC,
};

const POOP: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Poop",
  objectType: "resource",
  grabbable: true,
  img: { src: "", alt: "poop" },
  rarity: COMMON,
};

// const BASIC = [TREE, ROCK];
// const COMMON = [POOP];

export const RESOURCE_RECIPES: {
  [K in Region]: {
    [J in Rarity]?: Array<GameObject>;
  };
} = {
  [FOREST]: {
    basic: [TREE, ROCK],
    common: [POOP],
  },
};
