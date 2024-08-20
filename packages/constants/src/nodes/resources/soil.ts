import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const SOIL: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("soil"),
  type: "soil",
  title: "Soil",
  roles: ["resource"],
  price: 2,
};
