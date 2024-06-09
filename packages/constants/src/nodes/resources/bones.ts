import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const BONES: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("bones"),
  type: "bones",
  title: "Bones",
  roles: ["resource"],
  price: 2,
};
