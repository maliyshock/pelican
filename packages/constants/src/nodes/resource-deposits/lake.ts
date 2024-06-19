import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";
export const LAKE: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("lake"),
  type: "lake",
  title: "Lake",
  roles: ["resource-deposit"],
  health: 3,
  price: 2,
  description:
    "nature's tranquil bathtub, perfect for serene reflections, spontaneous swims, and the occasional paddleboat adventure, serving as a picturesque reminder that even the planet likes to take a moment to just float",
};
