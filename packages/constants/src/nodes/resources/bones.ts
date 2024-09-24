import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const BONES: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("bones"),
  type: "bones",
  title: "Bones",
  roles: ["resource"],
  price: 2,
  draggable: true,
};
