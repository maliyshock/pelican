import { GameObject } from "~/types";
import { BASIC, COMMON, PLANK, POOP, RESOURCE, STONE, STONE_DEPOSIT, TREE, WOOD } from "~/constants/dictionary.ts";

// TODO: do i have to many names?
// name - it is a name of the object, can be used as a title. For example name of the creature
// objectKeyName - is a name for internal usage purposes, for example to list resources. Something in between an id and name
// id of node - uniquely generated id
// object type - it is a type or category or tag of the object

export const TREE_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input" }],
  name: "Tree",
  objectKeyName: TREE,
  root: TREE,
  health: 3,
  objectType: ["resourceDeposit"],
  img: { src: "/assets/tree.jpg", alt: TREE },
  rarity: BASIC,
  price: 1,
};

export const WOOD_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input" }],
  outputs: [{ id: "output", name: "output" }],
  name: "Wood",
  objectKeyName: WOOD,
  root: TREE,
  quantity: 1,
  objectType: [RESOURCE],
  img: { src: "", alt: WOOD },
  rarity: BASIC,
  price: 1,
};

export const PLANK_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input" }],
  outputs: [{ id: "output", name: "output" }],
  name: "Plank",
  root: TREE,
  quantity: 1,
  objectType: [RESOURCE],
  objectKeyName: PLANK,
  img: { src: "", alt: PLANK },
  rarity: BASIC,
  price: 2,
};

export const STONE_DEPOSIT_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input" }],
  name: "Stone Deposit",
  root: STONE_DEPOSIT,
  objectKeyName: STONE_DEPOSIT,
  health: 3,
  objectType: ["resourceDeposit"],
  img: { src: "/assets/stone.jpg", alt: STONE_DEPOSIT },
  rarity: BASIC,
  price: 1,
};

export const STONE_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input" }],
  outputs: [{ id: "output", name: "output" }],
  name: "Piece of stone",
  objectKeyName: STONE,
  root: STONE_DEPOSIT,
  quantity: 1,
  objectType: ["resource"],
  img: { src: "/assets/stone-piece.jpg", alt: STONE },
  rarity: BASIC,
  price: 1,
};

export const POOP_OBJECT: GameObject = {
  inputs: [{ id: "input", name: "input" }],
  name: "Poop",
  objectType: ["resource", "food"],
  objectKeyName: POOP,
  img: { src: "/assets/poop.jpg", alt: POOP },
  rarity: COMMON,
  price: 1,
};
