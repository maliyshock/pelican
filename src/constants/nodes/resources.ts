import { GameObject } from "~/types";
import { BASIC, COMMON, PIECE_OF_STONE, PLANK, POOP, STONE, TREE, WOOD } from "~/constants/dictionary.ts";

export const TREE_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Tree",
  root: "tree",
  health: 3,
  objectType: ["resourceDeposit"],
  objectKeyName: TREE,
  grabbable: true,
  img: { src: "/assets/tree.jpg", alt: "tree" },
  rarity: BASIC,
  price: 1,
};

export const WOOD_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  outputs: [{ id: "output", name: "output", type: "output" }],
  name: "Wood",
  root: "tree",
  quantity: 1,
  objectType: ["resource"],
  objectKeyName: WOOD,
  grabbable: true,
  img: { src: "", alt: "wood" },
  rarity: BASIC,
  price: 1,
};

export const PLANK_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  outputs: [{ id: "output", name: "output", type: "output" }],
  name: "Plank",
  root: "tree",
  quantity: 1,
  objectType: ["resource"],
  objectKeyName: PLANK,
  grabbable: true,
  img: { src: "", alt: "plank" },
  rarity: BASIC,
  price: 2,
};

export const STONE_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Stone",
  root: "stone",
  health: 3,
  objectType: ["resourceDeposit"],
  objectKeyName: STONE,
  grabbable: true,
  img: { src: "/assets/stone.jpg", alt: "rock" },
  rarity: BASIC,
  price: 1,
};

export const PIECE_OF_STONE_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  outputs: [{ id: "output", name: "output", type: "output" }],
  name: "Stone piece",
  root: "stone",
  quantity: 1,
  objectType: ["resource"],
  objectKeyName: PIECE_OF_STONE,
  grabbable: true,
  img: { src: "/assets/stone-piece.jpg", alt: "stone" },
  rarity: BASIC,
  price: 1,
};

export const POOP_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input", type: "input" }],
  name: "Poop",
  objectType: ["resource", "food"],
  objectKeyName: POOP,
  grabbable: true,
  img: { src: "/assets/poop.jpg", alt: "poop" },
  rarity: COMMON,
  price: 1,
};
