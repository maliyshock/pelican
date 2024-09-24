import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const SKIN: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("skin"),
  type: "skin",
  title: "Some, um... skin",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 1,
  draggable: true,
};
