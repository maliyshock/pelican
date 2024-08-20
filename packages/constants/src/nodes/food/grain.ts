import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";
export const GRAIN: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("grain"),
  type: "grain",
  title: "Grain",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 1,
  health: 1,
};
