import { GameObject } from "~/types";
import { BASIC, COMMON, STONE } from "~/constants/dictionary.ts";

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
  outputs: [{ id: "output", name: "output", type: "output" }],
  name: "Wood",
  quantity: 1,
  objectType: ["resource"],
  objectKeyName: "wood",
  grabbable: true,
  img: { src: "", alt: "wood" },
  rarity: BASIC,
};

export const STONE_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Stone",
  health: 3,
  objectType: ["resourceDeposit"],
  objectKeyName: STONE,
  grabbable: true,
  img: { src: "/assets/stone.jpg", alt: "rock" },
  rarity: BASIC,
};

export const PIECE_OF_STONE_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  outputs: [{ id: "output", name: "output", type: "output" }],
  name: "Stone piece",
  quantity: 1,
  objectType: ["resource"],
  objectKeyName: "stone-piece",
  grabbable: true,
  img: { src: "/assets/stone-piece.jpg", alt: "stone" },
  rarity: BASIC,
};

export const POOP_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Poop",
  objectType: ["resource", "food"],
  objectKeyName: "poop",
  grabbable: true,
  img: { src: "/assets/poop.jpg", alt: "poop" },
  rarity: COMMON,
};
