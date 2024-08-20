import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const APPLE: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("apple"),
  type: "apple",
  title: "Apple",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 2,
  health: 1,
};
