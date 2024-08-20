import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const TREE: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("tree"),
  type: "tree",
  title: "Tree",
  roles: ["resource-deposit"],
  price: 2,
  health: 3,
};
