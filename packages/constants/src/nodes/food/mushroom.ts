import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const MUSHROOM: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("mushroom"),
  type: "mushroom",
  title: "Mushroom",
  roles: ["food", "ingredient"],
  price: 2,
};
