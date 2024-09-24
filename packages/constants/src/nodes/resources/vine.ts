import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const VINE: GameNodeData = {
  inputs: [createSocket({ id: "target_0" })],
  outputs: [createSocket({ id: "source_0" })],
  img: createImg("vine"),
  type: "vine",
  title: "Vine",
  roles: ["resource"],
  price: 2,
  draggable: true,
};
