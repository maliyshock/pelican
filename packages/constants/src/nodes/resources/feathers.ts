import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const FEATHERS: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("feathers"),
  type: "feathers",
  title: "Feathers",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 1,
};
