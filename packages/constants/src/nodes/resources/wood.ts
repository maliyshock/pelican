import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";
export const WOOD: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("wood"),
  type: "wood",
  title: "Wood",
  roles: ["resource"],
  price: 1,
  health: 3,
};
