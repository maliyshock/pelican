import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const BERRY: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("berry"),
  type: "berry",
  title: "Berry",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 1,
  health: 1,
  draggable: true,
};
