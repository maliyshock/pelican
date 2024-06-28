import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const WILD_GRAPES: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("wild-grapes"),
  type: "wild-grapes",
  title: "Wild grapes",
  roles: ["food", "ingredient"],
  price: 2,
  nutrition: 2,
  health: 1,
};
