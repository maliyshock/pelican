import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const SOIL: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("soil"),
  type: "soil",
  title: "Soil",
  roles: ["resource"],
  price: 2,
};
