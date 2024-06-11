import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const PLANK: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("plank"),
  type: "plank",
  title: "Plank",
  roles: ["resource"],
  price: 2,
};
