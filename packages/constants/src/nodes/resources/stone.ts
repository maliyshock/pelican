import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";
export const STONE: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("stone"),
  type: "stone",
  title: "Piece of stone",
  roles: ["resource"],
  price: 1,
};
