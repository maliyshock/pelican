import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const LEAFS: GameNodeData = {
  inputs: [createSocket({ index: 0 })],
  outputs: [createSocket({ index: 0 })],
  img: createImg("leafs"),
  type: "leafs",
  title: "Leafs",
  roles: ["resource"],
  price: 2,
};
