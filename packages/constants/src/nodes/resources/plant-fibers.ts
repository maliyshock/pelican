import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const PLANT_FIBERS: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("plant-fibers"),
  type: "plant-fibers",
  title: "Plant Fibers",
  roles: ["resource"],
  price: 2,
  draggable: true,
};
