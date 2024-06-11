import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const APPLE: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("apple"),
  type: "apple",
  title: "Apple",
  roles: ["food", "ingredient"],
  price: 2,
};
