import { GameObject } from "~/types";
import { BASIC, COMMON, ROCK } from "~/constants/dictionary.ts";

export const TREE_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Tree",
  health: 3,
  objectType: ["resourceDeposit"],
  objectKeyName: "tree",
  grabbable: true,
  img: { src: "/assets/tree.jpg", alt: "tree" },
  rarity: BASIC,
};

export const WOOD_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Wood",
  quantity: 1,
  objectType: ["resource"],
  objectKeyName: "wood",
  grabbable: true,
  img: { src: "", alt: "wood" },
  rarity: BASIC,
};

export const ROCK_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Rock",
  health: 3,
  objectType: ["resourceDeposit"],
  objectKeyName: ROCK,
  grabbable: true,
  img: { src: "", alt: "rock" },
  rarity: BASIC,
};

export const STONE_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Stone",
  quantity: 1,
  objectType: ["resource"],
  objectKeyName: "stone",
  grabbable: true,
  img: { src: "", alt: "stone" },
  rarity: BASIC,
};

export const POOP_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Poop",
  objectType: ["resource", "food"],
  objectKeyName: "poop",
  grabbable: true,
  img: { src: "", alt: "poop" },
  rarity: COMMON,
};
