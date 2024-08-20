import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

// тростник
export const CANE: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("cane"),
  type: "cane",
  title: "Cane",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 1,
};
