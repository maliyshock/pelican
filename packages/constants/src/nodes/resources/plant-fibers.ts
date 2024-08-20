import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const PLANT_FIBERS: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("plant-fibers"),
  type: "plant-fibers",
  title: "Plant Fibers",
  roles: ["resource"],
  price: 2,
};
