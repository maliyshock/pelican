import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const FISH: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("fish"),
  type: "fish",
  title: "Fish",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 4,
  health: 1,
};
