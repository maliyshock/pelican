import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const BERRY: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("berry"),
  type: "berry",
  title: "Berry",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 1,
  health: 1,
};
