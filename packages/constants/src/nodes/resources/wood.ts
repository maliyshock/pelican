import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const WOOD: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("wood"),
  type: "wood",
  title: "Wood",
  roles: ["resource", "fuel"],
  price: 1,
  health: 3,
  fuel: 30,
  draggable: true,
};
