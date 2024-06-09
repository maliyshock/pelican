import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const VINE: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("vine"),
  type: "vine",
  title: "Vine",
  roles: ["resource"],
  price: 2,
};
