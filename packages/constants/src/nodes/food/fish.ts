import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const FISH: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("fish"),
  type: "fish",
  title: "Fish",
  roles: ["food", "ingredient"],
  price: 2,
};
