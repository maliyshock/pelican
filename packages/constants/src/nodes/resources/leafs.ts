import { GameNodeData } from "~/types/game-node";
import { createImg, createSocket } from "@pelican/utils";

export const LEAFS: GameNodeData = {
  inputs: [createSocket(1)],
  outputs: [createSocket(1)],
  img: createImg("leafs"),
  type: "leafs",
  title: "Leafs",
  roles: ["resource"],
  price: 2,
};
