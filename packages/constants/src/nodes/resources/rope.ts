import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const ROPE: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("rope"),
  type: "rope",
  title: "Rope",
  roles: ["resource", "fuel"],
  price: 2,
  fuel: 6,
  draggable: true,
};
