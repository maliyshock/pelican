import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const MUSHROOM: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("mushroom"),
  type: "mushroom",
  title: "Mushroom",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 3,
  health: 1,
};
