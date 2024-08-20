import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const FEATHERS: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("feathers"),
  type: "feathers",
  title: "Feathers",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 1,
};
