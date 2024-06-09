import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const SKIN: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("skin"),
  type: "skin",
  title: "Some, um... skin",
  roles: ["resource"],
  price: 2,
};
