import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";
export const STONE: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("stone"),
  type: "stone",
  title: "Piece of stone",
  roles: ["resource"],
  price: 1,
  draggable: true,
};
