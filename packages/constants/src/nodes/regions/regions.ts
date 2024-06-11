import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const FOREST: GameNodeData = {
  inputs: [createSocket(1)],
  img: createImg("forest"),
  type: "forest",
  title: "Forest",
  health: 3,
  roles: ["region"],
};
