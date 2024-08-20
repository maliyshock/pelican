import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const INSECTS: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("insects"),
  type: "insects",
  title: "Insects",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 1,
  health: 1,
};
