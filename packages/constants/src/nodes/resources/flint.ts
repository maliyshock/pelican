import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const FLINT: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("flint"),
  type: "flint",
  title: "Flint",
  roles: ["resource"],
  price: 2,
};
