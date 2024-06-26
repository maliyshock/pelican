import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

// тростник
export const CANE: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("cane"),
  type: "cane",
  title: "Cane",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 1,
};
