import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const FOREST: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  img: createImg("forest"),
  type: "forest",
  title: "Forest",
  health: 3,
  roles: ["region"],
};

export const TRANQUIL_GLADE: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  img: createImg("tranquil_glade"),
  type: "glade",
  title: "The Tranquil Glade",
  health: 3,
  roles: ["region"],
};
