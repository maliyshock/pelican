import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const PLANK: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("plank"),
  type: "plank",
  title: "Plank",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 15,
};
