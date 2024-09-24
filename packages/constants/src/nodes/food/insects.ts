import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const INSECTS: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("insects"),
  type: "insects",
  title: "Insects",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 1,
  health: 1,
  draggable: true,
};
