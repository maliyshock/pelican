import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const VINE: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("vine"),
  type: "vine",
  title: "Vine",
  roles: ["resource"],
  price: 2,
};
