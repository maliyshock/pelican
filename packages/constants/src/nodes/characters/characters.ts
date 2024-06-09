import { createImg, createSocket } from "@pelican/utils";
import { GameNodeData } from "~/types/game-node";

export const PELICAN: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("pelican"),
  type: "pelican",
  // title: "",
  roles: ["player", "character"],
  dmg: 1,
  health: 10,
};

export const FOX: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("fox"),
  type: "fox",
  title: "Fox",
  roles: ["character"],
  dmg: 15,
  health: 35,
};
