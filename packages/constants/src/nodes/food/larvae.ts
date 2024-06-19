import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const LARVAE: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("larvae"),
  type: "larvae",
  title: "Larvae",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 2,
};
