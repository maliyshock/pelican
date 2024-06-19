import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const PLANT_FIBERS: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("plant-fibers"),
  type: "plant-fibers",
  title: "Plant Fibers",
  roles: ["resource"],
  price: 2,
};
