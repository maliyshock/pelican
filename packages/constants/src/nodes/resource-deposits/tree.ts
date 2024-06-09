import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const TREE: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("tree"),
  type: "tree",
  title: "Tree",
  roles: ["resource-deposit"],
  price: 2,
};
