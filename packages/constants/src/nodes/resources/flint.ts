import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const FLINT: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("flint"),
  type: "flint",
  title: "Flint",
  roles: ["resource"],
  price: 2,
};
