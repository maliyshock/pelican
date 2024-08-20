import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const LARVAE: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("larvae"),
  type: "larvae",
  title: "Larvae",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 2,
  health: 1,
};
