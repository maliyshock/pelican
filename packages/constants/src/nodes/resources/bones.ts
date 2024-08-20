import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const BONES: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("bones"),
  type: "bones",
  title: "Bones",
  roles: ["resource"],
  price: 2,
};
