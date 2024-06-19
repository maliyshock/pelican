import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";
export const GRAIN: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("grain"),
  type: "grain",
  title: "Grain",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 1,
};
