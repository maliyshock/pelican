import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";
export const HONEY: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("honey"),
  type: "honey",
  title: "Honey",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 2,
  health: 1,
};
