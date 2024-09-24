import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const SOIL: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("soil"),
  type: "soil",
  title: "Soil",
  roles: ["resource"],
  price: 2,
  draggable: true,
};
