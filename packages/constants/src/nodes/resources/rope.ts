import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const ROPE: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("rope"),
  type: "rope",
  title: "Rope",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 6,
};
